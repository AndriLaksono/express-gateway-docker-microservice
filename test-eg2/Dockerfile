FROM node:latest

WORKDIR /usr/src/app/test-eg2

COPY package.json /usr/src/app/test-eg2

RUN npm install

COPY . /usr/src/app/test-eg2

EXPOSE 8080

CMD [ "npm", "start" ]