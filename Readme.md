# Express Foundation

# Installing Express.js

- installation

  1. npm init [This will provide package.json file]
  2. npm i express
  3. npm i -D typescript [we are using dev dependency since we want to run typescript converting it into javascript]
  4. tsc --init [we are using this to create typescript config file]
  5. create folder src->app->app.ts & server.ts
  6. create dist folder named dist which will hold the converted js files
  7. Configure tsconfig -> "rootDir": "./src/", "outDir": "./dist",
  8. Install node typing library npm i -D @types/node
  9. Install express typing library npm i -D @types/express

#### create app.ts :

```javascript
// const express = require('express')
// we will use import here
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
```

#### create server.ts :

```javascript
import { Server } from "http";
import app from "./app";

const PORT = 5000;

let server: Server;
async function bootStrap() {
  server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}

bootStrap();
```
