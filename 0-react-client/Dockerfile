FROM node:latest

WORKDIR /usr/src/app/react-client

COPY package.json /usr/src/app/react-client

RUN npm install

COPY . /usr/src/app/react-client

EXPOSE 3000

CMD [ "npm", "start" ]