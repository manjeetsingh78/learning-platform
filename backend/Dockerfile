# ---------- Build Stage ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package files first (cache friendly)
COPY package*.json ./

# Install ALL dependencies for build
RUN npm ci

# Copy source code
COPY . .

# If you have a build step (TypeScript / Prisma), keep this
# RUN npm run build

# ---------- Production Stage ----------
FROM node:18-alpine

WORKDIR /app

# Copy only required files from build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/config ./config
COPY --from=build /app/routes ./routes
COPY --from=build /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Ownership
RUN chown -R nodejs:nodejs /app

# Switch user
USER nodejs

# Match your real backend port (change if needed)
EXPOSE 3000

# Health check (requires /health route)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "server.js"]
