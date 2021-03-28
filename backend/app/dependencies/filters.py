import json
from functools import lru_cache


@lru_cache()
def tours_info():
    with open("data/tours_info.json") as f_in:
        tours_info_ = json.load(f_in)
    return tours_info_


@lru_cache()
def users_info():
    with open("data/users_info.json") as f_in:
        users_info_ = json.load(f_in)
    return users_info_
