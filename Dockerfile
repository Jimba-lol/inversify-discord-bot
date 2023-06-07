FROM node:18-alpine

WORKDIR /app

COPY ./build ./
COPY ./package*.json ./
COPY .env ./

# @discordjs/opus requires g++ and make
# youtube-dl-exec requires python3
RUN apk add --update --no-cache g++ make python3

RUN npm i

EXPOSE 8080
CMD [ "node", "index.js" ]
