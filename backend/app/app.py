from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import filters, recommender

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(filters.router)
app.include_router(recommender.router)
