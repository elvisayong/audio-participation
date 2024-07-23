# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
