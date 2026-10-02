FROM node:22-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend ./frontend
COPY packages ./packages
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
WORKDIR /app/frontend
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
WORKDIR /app/frontend
COPY --from=builder /app/frontend/.next/standalone /app
COPY --from=builder /app/frontend/.next/static ./.next/static
COPY --from=builder /app/frontend/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
