FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build



FROM node:18-alpine AS dev
WORKDIR /app

ARG PORT
ARG WEATHER_KEY
ARG SECRET_KEY
ARG ACCESS_TOKEN
ARG REFRESH_TOKEN

ENV PORT $PORT
ENV WEATHER_KEY $WEATHER_KEY
ENV SECRET_KEY $SECRET_KEY
ENV ACCESS_TOKEN $ACCESS_TOKEN
ENV REFRESH_TOKEN $REFRESH_TOKEN

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]



FROM node:18-alpine AS prod
WORKDIR /app

ARG PORT
ARG WEATHER_KEY
ARG SECRET_KEY
ARG ACCESS_TOKEN
ARG REFRESH_TOKEN

ENV PORT $PORT
ENV WEATHER_KEY $WEATHER_KEY
ENV SECRET_KEY $SECRET_KEY
ENV ACCESS_TOKEN $ACCESS_TOKEN
ENV REFRESH_TOKEN $REFRESH_TOKEN

RUN mkdir -p /app/build

ARG PORT
ENV PORT $PORT

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY --from=builder /app/build ./build

EXPOSE $PORT

CMD ["node", "./build/index.js"]