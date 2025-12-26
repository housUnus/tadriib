# Use Node LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy app
COPY . .

# Build the app
RUN npm run build

# Expose port (internal)
EXPOSE 3000

# Start Next.js in production
CMD ["npm", "run", "start"]
