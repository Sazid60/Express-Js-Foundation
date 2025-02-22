"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
// middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });
// Understanding of params
// api end point http://localhost:3000/56/45
app.get("/:userId/:subId", logger, (req, res) => {
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
app.get("/", logger, (req, res) => {
    console.log(req.query);
    // output { email: 'sazid@gmail.com' }
    // { email: 'sazid@gmail.com', name: 'sazid' }
    console.log(req.query.email);
    // output sazid@gmail.com
    res.send("Hello For Query");
});
app.post("/", logger, (req, res) => {
    // res.send("Got a POST request");
    console.log(req.body);
    // this will log undefined so we have to use parser
    // if we want to  send a json response
    res.json({ message: "Got a POST request" });
});
exports.default = app;
