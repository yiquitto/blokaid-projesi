# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/
RUN pnpm i --frozen-lockfile --filter frontend
COPY frontend/ ./frontend/
RUN pnpm --filter frontend build

# Stage 2: Serve
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
