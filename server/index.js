const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const posts = require("./posts");
dotenv.config();

const app = express();
const BASE_PATH = "/api/v1";

app.use(express.static(path.join(__dirname, "../client/build")));

app.get(`${BASE_PATH}/all-posts`, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(posts.data));
});

app.get(`${BASE_PATH}/post/:postId`, async (req, res) => {
  const { postId } = req.params;
  res.setHeader("Content-Type", "application/json");
  const post = posts.data.find(post => post.id === parseInt(postId));
  if (!post) {
    return res.status(404).send("post not found");
  }
  res.send(JSON.stringify(post));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
