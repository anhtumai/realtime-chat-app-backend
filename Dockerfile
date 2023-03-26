FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY build ./build

RUN yarn install --production

EXPOSE 8080

CMD ["yarn", "run", "start:prod"]

