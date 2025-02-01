# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code
COPY . .

# Ensure SQLite database file persists
VOLUME [ "/app/prisma" ]

# Generate Prisma Client
RUN npx prisma generate

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
