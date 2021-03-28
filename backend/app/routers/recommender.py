import random

import pandas as pd
from fastapi import Depends, APIRouter

from app.schemas import Filters
from app.dependencies import (
    tour_data,
    user_data,
    tours_info,
    visited_dict,
    ranker_features,
    candidates_features,
    features_categorical_mappers,
)

random.seed(42)
router = APIRouter(prefix="/api")

from loguru import logger
@router.post("/tours")
async def tours(
    filters: Filters,
    tours_info_=Depends(tours_info),
    tour_data_=Depends(tour_data),
    user_data_=Depends(user_data),
    ranker_features_=Depends(ranker_features),
    candidates_features_=Depends(candidates_features),
    visited_dict_=Depends(visited_dict),
    features_categorical_mappers_=Depends(features_categorical_mappers),
):
    logger.debug(filters)
    country, user_id = filters.country, filters.user_id

    result = []
    if not user_id:
        tours_to_select = (
            list(filter(lambda x: x["country"] == country, tours_info_))
            if country
            else random.sample(tours_info_, 15)
        )
        annotations = (
            [f"Авторизуйтесь, чтобы увидеть рекомендации"]
            if country
            else [f"Авторизуйтесь, чтобы увидеть рекомендации или укажите страну"]
        )
        for tour in tours_to_select:
            tour.update({"annotations": annotations, "score": 0})
            result.append(tour)
    else:
        if country:
            tours_to_select = list(
                filter(lambda x: x["country"] == country, tours_info_)
            )
            tours_to_select = list(map(lambda x: x["name"], tours_to_select))
        else:
            user_visited = visited_dict_.get(user_id, [])
            candidates_model, candidates_features__ = candidates_features_
            df_ = pd.DataFrame([[user_id]], columns=["ИД клиента"])
            df_ = pd.merge(df_, user_data_, on="ИД клиента")
            X_ = df_[candidates_features__]
            probas = candidates_model.predict_proba(X_).flatten()
            countries_probas = zip(range(len(probas)), probas)

            countries_probas_filtered = filter(
                lambda x: x[0] not in user_visited, countries_probas
            )
            top_countries = sorted(
                countries_probas_filtered, key=lambda x: x[1], reverse=True
            )[:3]
            top_countries = [features_categorical_mappers_[i[0]] for i in top_countries]
            tours_to_select = filter(
                lambda x: x["country"] in top_countries, tours_info_
            )
            tours_to_select = [tour["name"] for tour in tours_to_select]

        df_ = pd.DataFrame(
            [(user_id, tour) for tour in tours_to_select],
            columns=["ИД клиента", "Наименование тура"],
        )
        df_ = pd.merge(df_, user_data_, on="ИД клиента")

        df_ = pd.merge(df_, tour_data_, on="Наименование тура")

        ranker, features = ranker_features_

        X = df_[features]
        scores = ranker.predict_proba(X)[:, 1]
        df_["score"] = scores
        df_ = df_.sort_values("score", ascending=False)
        tours_scores = df_[["Наименование тура", "score"]].values[:100].tolist()
        tours_scores = random.sample(tours_scores, 15)
        tours_scores = sorted(tours_scores, key=lambda x: x[1], reverse=True)

        for tour, score in tours_scores:
            tour_info__ = list(filter(lambda x: x["name"] == tour, tours_info_))[0]
            tour_info__["annotations"] = [f"CatBoost ranker score: {score}"]
            tour_info__["score"] = score
            result.append(tour_info__)

    return result
