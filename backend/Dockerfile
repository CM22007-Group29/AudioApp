FROM python:3.6
ADD . /main
WORKDIR /main
RUN pip install -r requirements.txt
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
