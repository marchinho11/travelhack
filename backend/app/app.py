from functools import lru_cache
import json
import pandas as pd
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@lru_cache()
def get_df():
    df = pd.read_csv("data/data-full.csv")
    return df


@app.get("/countries")
async def countries(df=Depends(get_df)):
    unique_countries = list(df["Страна тура"].dropna().unique())
    return unique_countries


@app.get("/tours")
async def tours(country: str, df=Depends(get_df)):
    tours_ = json.loads(
        df[df["Страна тура"] == country][
            ["Наименование тура", "Звездность", "Тип питания"]
        ]
        .drop_duplicates()
        .dropna()
        .head(10)
        .to_json(force_ascii=False, orient="records")
    )
    return tours_
