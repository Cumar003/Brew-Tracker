FROM node:18-alpine AS builder

# 1. Enable corepack (official way to manage pnpm)
RUN corepack enable && \
    corepack prepare pnpm@latest --activate

# 2. Set up workdir
WORKDIR /client

# 3. Copy package files
COPY package.json pnpm-lock.yaml ./

# 4. Install dependencies   
RUN pnpm install

COPY . .

RUN pnpm build

# Stage 2: Runtime (for development)
FROM node:18-alpine AS development

# 1. Enable corepack again
RUN corepack enable && \
    corepack prepare pnpm@latest --activate

# 2. Set up workdir
WORKDIR /client

# 3. Copy package files
COPY package.json pnpm-lock.yaml ./

# 4. Install dependencies (no build)
RUN pnpm install

# 5. Copy all files
COPY . .

EXPOSE 5173

# 7. Start command
CMD ["pnpm", "dev"]

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]