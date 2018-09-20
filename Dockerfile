
# Setup and build the ui

FROM node:9.4.0-alpine as ui

WORKDIR /usr/app/ui/
COPY ui/package*.json ./
RUN npm install -qy
COPY ui/ ./
RUN npm run build


# Setup the server

FROM node:9.4.0-alpine

WORKDIR /usr/app/
COPY --from=ui /usr/app/ui/build/ ./ui/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]
