FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app

RUN mkdir -p /app && chown -R node:node /app

USER node

COPY --chown=node:node package*.json ./
RUN npm ci --only=production --legacy-peer-deps
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]