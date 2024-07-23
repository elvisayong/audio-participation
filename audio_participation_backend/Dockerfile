# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container to /app
WORKDIR /app

# Install PostgreSQL client libraries
RUN apt-get update && apt-get install -y libpq-dev gcc

# Copy the requirements file into the container at /app
COPY audio_participation_backend/audio_participation_backend/requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to /app
COPY audio_participation_backend /app

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
