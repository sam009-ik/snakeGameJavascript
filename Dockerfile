# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Expose the port the app runs on
EXPOSE 5000

# Define environment variable (if needed)
ENV NAME World

# Run app.py using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "--timeout", "120", "app:app"]

