#!/bin/bash

echo "Setting up development environment..."

# Check if .env.example files exist before copying
if [ -f "backend/.env.example" ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env"
else
    echo "Warning: backend/.env.example not found."
fi

if [ -f "frontend/.env.example" ]; then
    cp frontend/.env.example frontend/.env
    echo "Created frontend/.env"
else
    echo "Warning: frontend/.env.example not found."
fi

echo "Setup complete. Please fill in the necessary values in the .env files."
