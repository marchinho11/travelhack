import pandas as pd
from app.dependencies import ranker_features, tour_data, tours_info, user_data
from app.schemas import Filters
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/api")


@router.post("/tours")
async def tours(
    filters: Filters,
    tours_info_=Depends(tours_info),
    tour_data_=Depends(tour_data),
    user_data_=Depends(user_data),
    ranker_features_=Depends(ranker_features),
):
    country, user_id = filters.country, filters.user_id

    tours_to_select = (
        filter(lambda x: x["country"] == country, tours_info_)
        if country
        else tours_info_
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
    tours_scores = df_[["Наименование тура", "score"]].values[:15]

    result = []
    for tour, score in tours_scores:
        tour_info__ = list(filter(lambda x: x["name"] == tour, tours_info_))[0]
        tour_info__["annotations"] = [f"CatBoost ranker score: {score}"]
        tour_info__["score"] = score
        result.append(tour_info__)

    return result
