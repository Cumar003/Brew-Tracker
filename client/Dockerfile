# Development stage
FROM node:22.14.0-alpine3.21 AS development

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /client

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 5173
CMD ["pnpm", "dev"]

# Build stage
FROM node:22.14.0-alpine3.21 AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /client

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine AS production

COPY --from=builder /client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
