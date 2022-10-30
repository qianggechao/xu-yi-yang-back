FROM node:14.17.0

RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /usr/www/egg

COPY package.json /usr/www/egg/package.json

RUN npm i --production

COPY . /usr/www/egg

EXPOSE 7001