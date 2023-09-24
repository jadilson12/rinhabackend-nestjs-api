FROM node:20.7.0-alpine

COPY api /home/node/app

WORKDIR /home/node/app

RUN npm i --force && npm run build

CMD ["npm", "run", "start:prod"]