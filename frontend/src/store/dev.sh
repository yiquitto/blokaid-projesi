#!/bin/bash

# A helper script to manage the docker-compose stack.

set -e

COMMAND=$1

if [ -z "$COMMAND" ]; then
    echo "Usage: $0 [up|down|logs|build|ps]"
    exit 1
fi

case $COMMAND in
    up)
        echo "🚀 Starting the Blokaid stack..."
        docker-compose -f infra/docker-compose.yml up -d --build
        ;;
    down)
        echo "🛑 Stopping the Blokaid stack..."
        docker-compose -f infra/docker-compose.yml down
        ;;
    logs)
        echo "📜 Tailing logs for all services..."
        docker-compose -f infra/docker-compose.yml logs -f
        ;;
    *)
        echo "Unknown command: $COMMAND"
        echo "Usage: $0 [up|down|logs|build|ps]"
        exit 1
        ;;
esac