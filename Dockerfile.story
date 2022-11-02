FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package*.json ./
RUN npm install --no-package-lock
COPY . .
RUN npm run build-storybook
RUN mkdir -p /app/html
RUN cp -rf /app/storybook-static/* /app/html

# production environment
#FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#COPY client.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 2000
#CMD ["nginx", "-g", "daemon off;"]

CMD ["npm", "run", "start:storybook"]
#COPY ./entrypoint.client.sh ./
#RUN chmod +x /app/entrypoint.client.sh
#ENTRYPOINT ["sh", "/app/entrypoint.client.sh"]