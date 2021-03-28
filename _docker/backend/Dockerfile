FROM python:3.8-slim-buster AS requirements_builder
ADD pyproject.toml /
ADD poetry.lock /
RUN pip install poetry
RUN poetry export -f requirements.txt --output requirements.txt

FROM python:3.8-slim-buster
RUN apt-get update && apt-get install -y build-essential gcc libc6-dev wget
ADD /backend /backend
COPY --from=requirements_builder /requirements.txt /backend/
WORKDIR /backend
RUN pip install -r requirements.txt
