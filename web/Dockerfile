FROM node:20-alpine AS  builder
WORKDIR /app
COPY package*.json ./
RUN corepack enable pnpm
RUN pnpm install
#--frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app

RUN corepack enable pnpm

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "start"]