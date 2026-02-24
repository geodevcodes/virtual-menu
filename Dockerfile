# --- Step 1: Build stage ---
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Declare build-time variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NODE_ENV=production

# Set environment variables for build
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXT_PUBLIC_ENVIRONMENT=${NEXT_PUBLIC_ENVIRONMENT}
ENV NODE_ENV=${NODE_ENV}

# ⚡ Clear previous Next.js build cache before building
RUN rm -rf .next

# Build Next.js app
RUN npm run build


# --- Step 2: Production stage ---
FROM node:20-alpine AS runner

# Set environment
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/tsconfig.* ./

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
