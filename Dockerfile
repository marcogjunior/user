# ---- Stage 1: Build ----
  FROM node:current-alpine AS builder

  # Set working directory
  WORKDIR /app
  
  # Copy package files and install dependencies
  COPY . .
  
  RUN npm install -g @nestjs/cli
  
  RUN npm install
  
  # Build the NestJS app
  RUN npm run build
  
  # ---- Stage 2: Production ----
  FROM node:current-alpine
  
  # Set working directory
  WORKDIR /app
  
  # Copy only necessary files from the builder stage
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package*.json ./
  
  # Install only production dependencies
  # --RUN npm install --omit=dev
  
  # Expose the app port
  EXPOSE 3000
  
  # Start the application
  CMD ["node", "dist/main"]
  