import json

from app.dependencies import get_df
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/api")


@router.get("/countries")
async def countries(df=Depends(get_df)):
    unique_countries = list(df["Страна тура"].dropna().unique())
    return unique_countries


@router.get("/users")
async def users(df=Depends(get_df)):
    users_info = df[["ИД клиента", "Пол", "Возраст клиента"]]
    users_info.columns = ["user_id", "gender", "age"]
    users_info = json.loads(
        users_info.drop_duplicates()
        .sample(10)
        .to_json(force_ascii=False, orient="records")
    )
    return users_info
