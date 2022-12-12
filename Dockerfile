FROM node:lts-alpine as build

RUN mkdir -p /home/node/app 
WORKDIR /home/node/app/
COPY k4r-storeviz/ ./
RUN npm install -g typescript
RUN npm install --legacy-peer-deps
RUN npm run build


FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app/
USER node
COPY --chown=node:node --from=build /home/node/app/dist ./
RUN npm install express
EXPOSE 3000
CMD [ "node", "server/server.js" ]
