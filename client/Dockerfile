FROM node:26-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_URL=http://127.0.0.1:3000
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
RUN npm run build
FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
COPY --chmod=755 docker-entrypoint.sh /docker-entrypoint.sh
USER node
EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
