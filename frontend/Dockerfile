FROM node:22-alpine

WORKDIR /app

ADD . /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5173
