FROM node:20-buster-slim as builder
# opus-magnum / admin
ARG APPLICATION
ARG PROFILE=development
ARG ARCHITECTURE=x64

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN rm -rf /app/node_modules
RUN npm cache clean --force
RUN npm install --force
RUN npx nx reset

RUN npx nx run ${APPLICATION}:build:${PROFILE}

FROM nginx:1.27.1-alpine as final
ARG APPLICATION
ENV APPLICATION=${APPLICATION}

EXPOSE 80
EXPOSE 433

COPY ./nginx-configs/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN sed -i "s/\${APPLICATION}/${APPLICATION}/g" /etc/nginx/nginx.conf
