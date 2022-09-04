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
<<<<<<< HEAD
EXPOSE 1338
EXPOSE 1339

ENTRYPOINT [ "bash", "/opt/app/entrypoint.sh" ]
# CMD [ "sleep", "infinity" ]
=======
EXPOSE 1337
ENTRYPOINT [ "bash", "/opt/app/entrypoint.sh" ]
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
