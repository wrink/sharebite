FROM node:19.4.0

RUN apt-get update
RUN apt-get install -y netcat

WORKDIR /usr/app
COPY ./package.json /usr/app
RUN npm install
COPY . /usr/app
