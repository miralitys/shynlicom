FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY server.mjs ./server.mjs
COPY redirects.mjs ./redirects.mjs
COPY airbnb-redirects.mjs ./airbnb-redirects.mjs
COPY apartment-redirects.mjs ./apartment-redirects.mjs
COPY deep-redirects.mjs ./deep-redirects.mjs
COPY moveout-redirects.mjs ./moveout-redirects.mjs
COPY office-redirects.mjs ./office-redirects.mjs

EXPOSE 10000

CMD ["node", "server.mjs"]
