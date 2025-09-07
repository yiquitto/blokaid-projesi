# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
RUN pnpm i --frozen-lockfile --filter backend
COPY backend/ ./backend/
COPY prisma/ ./prisma/
RUN pnpm --filter backend prisma:generate
RUN pnpm --filter backend build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
RUN pnpm i --frozen-lockfile --filter backend --prod
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./backend/package.json
EXPOSE 3001
CMD ["pnpm", "--filter", "backend", "start"]
