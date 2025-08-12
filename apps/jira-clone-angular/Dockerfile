# Stage 1: Build the Angular application
FROM node:22-slim AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json and nx.json to install dependencies
COPY package*.json ./
COPY nx.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the Angular application using Nx
RUN npx nx build jira-clone-angular --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS production-stage

# Copy the custom nginx configuration
COPY ./apps/jira-clone-angular/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the build-stage to the Nginx web root
COPY --from=build-stage /app/dist/apps/jira-clone-angular/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]