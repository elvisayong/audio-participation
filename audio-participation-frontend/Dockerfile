# audio-participation-frontend/Dockerfile

# Use the official Node.js image as a base image
FROM node:14

# Set work directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

# Copy project
COPY . /usr/src/app/

# Build the React app
RUN npm run build

# Use a basic web server to serve the static files
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
