from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def index():
    return [{"Тур": "тур1"}, {"Тур": "тур2"}, {"Тур": "тур3"}]
