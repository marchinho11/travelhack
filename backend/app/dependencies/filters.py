import json
from functools import lru_cache

import pandas as pd


@lru_cache()
def get_df():
    df = pd.read_csv("data/data-full.csv")
    return df


@lru_cache()
def tours_info():
    with open("data/tours_info.json") as f_in:
        tours_info_ = json.load(f_in)
        tours_info_ = json.loads(tours_info_)
    return tours_info_


@lru_cache()
def users_info():
    with open("data/users_info.json") as f_in:
        users_info_ = json.load(f_in)
    return users_info_
