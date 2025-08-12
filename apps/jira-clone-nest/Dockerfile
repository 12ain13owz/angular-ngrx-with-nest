# Stage 1: Build the NestJS application
FROM node:22-slim AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json and nx.json
COPY package*.json ./
COPY nx.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the NestJS application using Nx
RUN npx nx build jira-clone-nest

# Stage 2: Run the production application
FROM node:22-slim AS production-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the built files from the build-stage
COPY --from=build-stage /app/dist/apps/jira-clone-nest ./dist/apps/jira-clone-nest

# Copy the .env file from the host
COPY ./.env ./.env

ENV NODE_ENV production

# The port that NestJS will listen on
EXPOSE 3000

# The command to run the NestJS application
CMD ["node", "dist/apps/jira-clone-nest/main.js"]