FROM python:3.11-slim

RUN pip install --upgrade pip

WORKDIR /main

ADD . /main

RUN pip install -r requirements.txt --no-cache-dir

RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg sqlite3 && \
    rm -rf /var/lib/apt/lists/*
