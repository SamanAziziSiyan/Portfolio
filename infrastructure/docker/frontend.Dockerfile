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
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/next.config.ts ./next.config.ts
COPY --from=builder /app/packages /app/packages
EXPOSE 3000
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
