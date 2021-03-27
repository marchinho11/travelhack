import json

from app.dependencies import get_df
from app.schemas import Filters
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/api")


@router.get("/countries")
async def countries(df=Depends(get_df)):
    unique_countries = list(df["Страна тура"].dropna().unique())
    return unique_countries


@router.post("/tours")
async def tours(filters: Filters, df=Depends(get_df)):
    tours_ = json.loads(
        df[df["Страна тура"] == filters.country][
            ["Наименование тура", "Звездность", "Тип питания"]
        ]
        .drop_duplicates()
        .dropna()
        .head(10)
        .to_json(force_ascii=False, orient="records")
    )
    return tours_
