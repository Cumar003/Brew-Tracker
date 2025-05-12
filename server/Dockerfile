# Build stage
FROM node:22.14.0-alpine3.21 AS builder

WORKDIR /usr/src/app

# Install deps
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source and build
COPY src ./src
RUN npm run build

# Production stage
FROM node:22.14.0-alpine3.21

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY .env ./

EXPOSE 3000
CMD ["node", "build/index.js"]
