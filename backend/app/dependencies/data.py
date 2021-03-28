import json
import pickle
from functools import lru_cache

import pandas as pd


@lru_cache()
def user_data():
    df_tour = pd.read_csv("data/df_user.csv", index_col=0)
    return df_tour


@lru_cache()
def tour_data():
    df_user = pd.read_csv("data/df_tour.csv", index_col=0)
    return df_user


@lru_cache()
def visited_dict():
    with open("data/visited_countries.json") as f_in:
        visited_countries = json.load(f_in)
    visited_countries = {int(k): v for k, v in visited_countries.items()}
    return visited_countries


@lru_cache()
def features_categorical_mappers():
    with open("data/features_categorical_mappers.pkl", "rb") as f_in:
        features_categorical_mappers_ = pickle.load(f_in)
    classes_ = features_categorical_mappers_["Страна тура"].classes_
    features_categorical_mappers_ = dict(zip(range(len(classes_)), classes_))
    return features_categorical_mappers_


@lru_cache()
def tour_descriptions():
    with open("data/descriptions_mapping.pkl", "rb") as f_in:
        descriptions_mapping = pickle.load(f_in)
    return descriptions_mapping
