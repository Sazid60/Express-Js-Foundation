import express, { NextFunction, Request, Response } from "express";

const app = express();

// parsers

app.use(express.json());

//  router
// _____________________________________________

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

// middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

//

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

// Understanding of params
// api end point http://localhost:3000/56/45
app.get("/:userId/:subId", logger, (req: Request, res: Response) => {
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
// Understanding of query
// api end point http://localhost:3000?email=sazid@gmail.com
// api end point http://localhost:3000?email=sazid@gmail.com&name=sazid
app.get("/", logger, (req: Request, res: Response) => {
  console.log(req.query);
  // output { email: 'sazid@gmail.com' }
  // { email: 'sazid@gmail.com', name: 'sazid' }
  console.log(req.query.email);
  // output sazid@gmail.com
  res.send("Hello For Query");
});

app.post("/", logger, (req: Request, res: Response) => {
  // res.send("Got a POST request");
  console.log(req.body);
  // this will log undefined so we have to use parser

  // if we want to  send a json response
  res.json({ message: "Got a POST request" });
});

export default app;
