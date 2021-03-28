import random

from fastapi import Depends, APIRouter

from app.dependencies import tours_info, users_info

router = APIRouter(prefix="/api")


@router.get("/countries")
async def countries(tours_info_=Depends(tours_info)):
    countries_ = list(set(tour["country"] for tour in tours_info_))
    return countries_


@router.get("/users")
async def users(users_info_=Depends(users_info)):
    users_info__ = random.sample(users_info_, 10)
    return users_info__
