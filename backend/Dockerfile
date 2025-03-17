FROM python:3.11-slim

ENV PYTHONPATH=/main

# Update package list and install gcc, build-essential, ffmpeg, and sqlite3
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc build-essential ffmpeg sqlite3 && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

WORKDIR /main

ADD . /main

RUN pip install -r backend/requirements.txt --no-cache-dir