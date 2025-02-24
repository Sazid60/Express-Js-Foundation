# Express Foundation

## Installing Express.js

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

## What is Parsers, Request and Response Object

- We can not Run Ts Files Directly we have to convert into js file
- Write "tsc" command in terminal to create js files inside dist file. tsc is compiler
- "node dist/app/server.js" command in terminal will run the js file of the dist folder
- For Each Changes we have to write "tsc" so that changes are made to automate this we will write "tsc -w" this will automatically track the changes and keep te dist folder files automatically. but this will require to restart this is a problem so we will use "npm i -D nodemon" whenever any js changes it will restart the server
- now add a script in package.json file for running the file

```js

  "scripts": {
    "start:dev": "nodemon ./dist/app/server.js",

```

- now split the terminal and keep one running "tsc-w" and other terminal will run "npm run start:dev"
- this means whenever any changes in js the tsc-w will track and notify and the nodemon will restart the serve

### Parsers

[express.json() documentation](https://expressjs.com/en/api.html#express.json)

- This means when we want to post data it required to parse the data otherwise it will show undefined
- There are different type parsers
  ![alt text](image.png)
- We will set for each types

-app.ts

```ts
import express, { Request, Response } from "express";

const app = express();

// parsers
app.use(express.json());
//

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", (req: Request, res: Response) => {
  // res.send("Got a POST request");
  console.log(req.body);
  // this will log undefined so we have to use parser

  // if we want to  send a json response
  res.json({ message: "Got a POST request" });
});

export default app;
```

## Middleware in Express.js

- One is request.param \_(If required to search by dynamic param)

```ts
// api end point http://localhost:3000/56/45
// Understanding of params
app.get("/:userId/:subId", (req: Request, res: Response) => {
  console.log(req.params);
  // output
  //   Example app listening on port 3000
  // { userId: '56' }
  console.log(req.params.userId);
  // output 56

  //  for subId it will show output as { userId: '56', subId: '45' }
  console.log(req.params.subId);

  res.send("Hello For Prams");
});
```

- one is Request.query

```ts
// Understanding of query
// api end point http://localhost:3000?email=sazid@gmail.com
// api end point http://localhost:3000?email=sazid@gmail.com&name=sazid
app.get("/", (req: Request, res: Response) => {
  console.log(req.query);

  // output { email: 'sazid@gmail.com' }
  // { email: 'sazid@gmail.com', name: 'sazid' }
  console.log(req.query.email);
  // output sazid@gmail.com
  res.send("Hello For Query");
});
```

## Middleware

- Middleware is software that acts as an intermediary between applications, services, or components in a computing environment. It facilitates communication, data exchange, and integration between different systems, often providing additional functionalities such as authentication, logging, and request processing.
- It Works as middle man.
- It Takes Request and do different thing with the requests as a middleman (checking, attaching something to the request or any thing we want). it can pass to the next middleware. this pass is done using next(). passing next and next it ends up in the controller. controller function means the call back function which sends response.

![alt text](image-1.png)

- Response pathanor age request ashar pore request niye kaj kore
- Middleware is basically used for authentication purpose

```ts
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get("/:userId/:subId", logger, (req: Request, res: Response) => {
  console.log(req.params);

  console.log(req.params.userId);

  console.log(req.params.subId);

  res.send("Hello For Prams");
});
```

## Router

- Inside app.ts

```ts
//  we will use router because in one file we will not write all routes in case of large project. we must have to separate the router
const userRouter = express.Router();
// another router
const courseRouter = express.Router();

//  by calling the router we will get the instance and on top of the instance we can use get, post and other methods

//  it will work as middleware so we have to write "use"

app.use("/api/v1/users", userRouter);
// another router
app.use("/api/v1/courses", courseRouter);

//

userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User Is Created Successfully",
    data: user,
  });
});

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: "User Is Created Successfully",
    data: course,
  });
});
// __________________________________________
```

## Error Handling

```ts
// Understanding Of Error handling
app.get("/", logger, async (req: Request, res: Response) => {
  try {
    res.send(something);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to get Data",
    });
  }
});
```

- If We want to modify express global error handler. If we want to handle the error from e centered area

```ts
app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(something);
    } catch (error) {
      next(error);
      //  this will directly pass the error to the global error handler
      // console.log(error);
      // res.status(400).json({
      //   success: false,
      //   message: "Failed to get Data",
      // });
    }
  }
);

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get Data",
    });
  }
});
```

- if we want to custom made error if any wrong route is hit
- This works like if it do not match any route the error is catches here.
- It should be in last and on top of global error handler
- // route like http://localhost:3000/dfdfdfdfdf
