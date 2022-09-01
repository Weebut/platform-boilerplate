ARG NODE_VERSION
FROM node:${NODE_VERSION}
# Installing libvips-dev for sharp Compatability
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm install pm2@latest -g
WORKDIR /opt/app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ .
RUN npm run build
EXPOSE 1338
EXPOSE 1339

ENTRYPOINT [ "bash", "/opt/app/entrypoint.sh" ]
# CMD [ "sleep", "infinity" ]
