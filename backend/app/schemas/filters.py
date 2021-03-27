from pydantic import BaseModel


class Filters(BaseModel):
    country: str = None
    user_id: int = None
