#!/bin/bash

# Exit on error
set -e

# Function to handle errors
handle_error() {
    echo "Error occurred in setup script at line $1"
    exit 1
}

# Set error handler
trap 'handle_error $LINENO' ERR

# Create and activate virtual environment for backend
echo "Setting up backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install backend dependencies
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Start backend server in background
echo "Starting backend server..."
python manage.py runserver 8000 &
BACKEND_PID=$!

# Setup frontend (in root directory)
echo "Setting up frontend..."
cd ..
npm install

# Start frontend server
echo "Starting frontend server..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT 