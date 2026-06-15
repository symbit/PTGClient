FROM node:20-buster-slim as builder
# ptg-client
ARG APPLICATION
ARG PROFILE=development
ARG ARCHITECTURE=x64

RUN mkdir -p /app
WORKDIR /app

# Install deps first so this layer is cached until dependencies actually change
COPY package.json package-lock.json /app/
RUN npm ci --legacy-peer-deps

# Source changes only invalidate from here down, not the install above
COPY . /app
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
