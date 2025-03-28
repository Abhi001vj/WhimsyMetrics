# Base Node.js image
FROM node:20-alpine as base

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app source
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-alpine as production

# Set environment variables
ENV NODE_ENV=production

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built app from build stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/client/dist ./client/dist
COPY --from=base /app/server ./server
COPY --from=base /app/shared ./shared

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "dist/server/index.js"]