import pickle
from functools import lru_cache


@lru_cache()
def ranker_features():
    with open("data/ranker_features.pkl", "rb") as f_in:
        model, features = pickle.load(f_in)
    return model, features
