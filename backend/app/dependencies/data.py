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
