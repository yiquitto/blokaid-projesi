# Stage 1: Build the frontend application
FROM node:20-alpine AS frontend-builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/
RUN pnpm i --frozen-lockfile --filter frontend

COPY frontend/ ./frontend/

RUN pnpm --filter frontend build

# Stage 2: Setup the Nginx server
FROM nginx:1.25-alpine

# Copy the custom Nginx configuration
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend assets from the builder stage
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html