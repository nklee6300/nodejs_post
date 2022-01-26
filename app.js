const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routes/posts");
const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, "-", new Date());
    next();
};


app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);

app.use("/api", [postsRouter]);

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});