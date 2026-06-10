# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build user-service

# Runtime Stage
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3093

CMD ["node", "dist/apps/user-service/main.js"]