FROM node:22-alpine

WORKDIR /app

ADD . /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173
