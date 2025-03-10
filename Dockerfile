# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml) first
COPY package.json pnpm-lock.yaml ./

# Install dependencies inside the container
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Expose the application port (if needed)
EXPOSE 3000

# Command to start the application
CMD ["node", "producer.js"]
