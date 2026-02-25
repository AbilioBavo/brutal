FROM node:20-alpine AS  builder
WORKDIR /app
COPY package*.json ./
RUN corepack enable pnpm
RUN pnpm install
#--frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm arkos prisma generate
RUN pnpm build

FROM node:20-alpine
WORKDIR /app

RUN corepack enable pnpm

COPY --from=builder /app/.build ./.build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8000
CMD ["pnpm", "start"]