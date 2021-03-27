from functools import lru_cache

import pandas as pd


@lru_cache()
def get_df():
    df = pd.read_csv("data/data-full.csv")
    return df
