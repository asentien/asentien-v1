FROM node:lts-alpine3.14 as builder

WORKDIR /usr/src/app

COPY ./react_app/package.json .
RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && npm install \
    && npm audit; exit 0 && npm audit fix \
    && apk del .gyp

COPY ./react_app .

ARG API_SERVER
ENV REACT_APP_API_SERVER=${API_SERVER}
RUN REACT_APP_API_SERVER=${API_SERVER} \ 
  npm run build

FROM node:lts-alpine3.14

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=builder /usr/src/app/build ./build