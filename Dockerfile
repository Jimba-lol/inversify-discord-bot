FROM node:18-alpine

WORKDIR /app
EXPOSE 8080
# may remove this line later in favor of setting env vars a different way
COPY .env ./
COPY ./package*.json ./

# @discordjs/opus requires g++ and make
# youtube-dl-exec requires python3 and ffmpeg
RUN apk add --update --no-cache \
  g++=12.2.1_git20220924-r10 \
  make=4.4.1-r1 \
  python3=3.11.3-r11 \
  ffmpeg=6.0-r14
RUN npm i

COPY ./build ./

CMD [ "node", "index.js" ]
