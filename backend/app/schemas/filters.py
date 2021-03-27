from pydantic import BaseModel


class Filters(BaseModel):
    country: str
