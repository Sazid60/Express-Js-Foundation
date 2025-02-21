"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/", (req, res) => {
    // res.send("Got a POST request");
    console.log(req.body);
    // this will log undefined so we have to use parser
    // if we want to  send a json response
    res.json({ message: "Got a POST request" });
});
exports.default = app;
