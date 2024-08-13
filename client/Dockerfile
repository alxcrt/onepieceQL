# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Build the application
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the app
# CMD [ "npm", "run", "dev" ]

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]