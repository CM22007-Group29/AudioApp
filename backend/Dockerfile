FROM python:3.6

WORKDIR /main

ADD . /main

RUN pip install -r requirements.txt

RUN apt-get update && \
    apt-get install -y ffmpeg sqlite3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
