# --------------------
# BUILD STAGE
# --------------------
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_SERVER_BASE_URL
ENV NEXT_PUBLIC_API_SERVER_BASE_URL=$NEXT_PUBLIC_API_SERVER_BASE_URL

# Limit Node memory during build
ENV NODE_OPTIONS="--max-old-space-size=1536"
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Build the app
RUN npm run build

# --------------------
# RUNTIME STAGE
# --------------------
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Expose internal port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
