FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the code
COPY . .

# Expose port 5000
EXPOSE 5000

# Run the dev server
CMD ["pnpm", "run", "dev"]