# "dockerBuild": "docker build -t \"api\" ./",

FROM node:alpine
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
