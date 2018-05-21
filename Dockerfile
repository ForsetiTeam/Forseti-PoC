#FROM node:9.11-alpine
FROM node:carbon

RUN mkdir /forseti
ADD ./ /forseti

WORKDIR /forseti

RUN rm -rf node_modules
RUN npm install
#CMD ["npm", "install"]

RUN npm run build_client
#CMD ["npm", "run", "build_client"]

ADD ./wait-for-it.sh /bin/wait-for-it.sh
RUN chmod a+x /bin/wait-for-it.sh
