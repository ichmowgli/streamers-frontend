# Build stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lock

COPY . .
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "start"]
