FROM mhart/alpine-node-auto
RUN apk update\
    && apk add git openssh-client\
    && npm install -g yarn\
    && yarn global add mocha eslint mochawesome babel-eslint \
    && yarn global add htmlhint eslint-json
RUN mkdir /app -p
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD ["/bin/sh", "-c", "/app/evaluate.sh"]
