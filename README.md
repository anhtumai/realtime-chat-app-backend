# Real time chat app backend

A WebSocket backend of a realtime chat app

## Usage

Requirement:

- NodeJs runtime, version 16+
- Yarn/Npm: package manager
- Docker: containerization solution, version 20

### Instruction

1. Develop and debug the app locally

```bash

# Install dependencies
yarn install

# Run TypeScript code locally with auto-reloading when code changes
yarn run start:dev

# the default port is 8080. It can be configured with
PORT=8081 yarn run start:dev
```

2. Build and run the app

```bash
yarn install

yarn run build

PORT=8080 yarn run start:prod
```

3. Build, containerize the app with Docker and run the docker container

```bash
yarn install

yarn run build:docker

# run with default port 8080
yarn run start:docker

# run with different port
docker run -p <another port>:8080 chat-app-backend
```
