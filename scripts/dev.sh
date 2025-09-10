#!/bin/bash

# A helper script to manage the docker-compose stack.
# This script is meant to be run from the project root, but will work from subdirectories.

set -e

# Find the project root by looking for the .git directory
PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || realpath "$(dirname "$0")/..")
COMPOSE_FILE="$PROJECT_ROOT/infra/docker-compose.yml"

COMMAND=$1

if [ -z "$COMMAND" ]; then
    echo "Usage: $(basename "$0") [up|down|logs|build|ps]"
    exit 1
fi

case $COMMAND in
    up)
        echo "🚀 Starting the Blokaid stack..."
        docker-compose -f "$COMPOSE_FILE" up -d --build
        ;;
    down)
        echo "🛑 Stopping the Blokaid stack..."
        docker-compose -f "$COMPOSE_FILE" down
        ;;
    logs)
        echo "📜 Tailing logs for all services..."
        shift
        docker-compose -f "$COMPOSE_FILE" logs -f "$@"
        ;;
    build)
        echo "🛠️  Building or rebuilding services..."
        docker-compose -f "$COMPOSE_FILE" build
        ;;
    ps)
        echo "📋 Listing containers..."
        docker-compose -f "$COMPOSE_FILE" ps
        ;;
    *)
        echo "Unknown command: $COMMAND"
        echo "Usage: $(basename "$0") [up|down|logs|build|ps]"
        exit 1
        ;;
esac