# Base image
FROM node:16.18.1

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# --frozen-lockfile

# Copy the entire app
COPY . .

EXPOSE 3001

# Development mode
CMD ["npm", "start"]
