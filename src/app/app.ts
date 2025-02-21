import express, { Request, Response } from "express";

const app = express();

// parsers

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

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

app.post("/", (req: Request, res: Response) => {
  // res.send("Got a POST request");
  console.log(req.body);
  // this will log undefined so we have to use parser

  // if we want to  send a json response
  res.json({ message: "Got a POST request" });
});

export default app;
