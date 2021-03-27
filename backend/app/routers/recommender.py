import json

from app.dependencies import get_df
from app.schemas import Filters
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/api")


@router.post("/tours")
async def tours(filters: Filters, df=Depends(get_df)):
    df_ = df[df["Страна тура"] == filters.country][
        ["Наименование тура", "Звездность", "Тип питания"]
    ]
    df_.columns = ["name", "stars", "food_type"]
    tours_ = json.loads(
        df_.drop_duplicates()
        .dropna()
        .head(10)
        .to_json(force_ascii=False, orient="records")
    )
    return tours_
