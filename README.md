# ag-test

## Features
 - Use react.js
 - Use react-router
 - Use react-redux-saga
 - Use webpack
 - Use node.js
 - Use docker
 - Use mongodb

## Install
```bash
git clone <reop>
```

## Commands
 - Before development
```
npm install
```

 - Development (web default listen on localhost:5566/admin)
```
npm run dev
```
 - Build to package will create `dist` directory
```
npm run build
```
 - Build frontend docker image
```
sh docker-build-frontend.sh
```
 - Start frontend docker image
```
docker-compose up -d
```
 - Start api server
```
node dist/server.js
```