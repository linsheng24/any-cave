FROM node:17.3

RUN apt-get update && apt-get install -y netcat

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:dev"]
