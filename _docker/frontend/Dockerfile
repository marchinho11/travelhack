FROM node:current-buster

ADD /frontend /frontend
WORKDIR /frontend

COPY /frontend/package.json /frontend/package.json
RUN npm install --legacy-peer-deps
COPY /frontend/. /frontend/.

EXPOSE 3000

