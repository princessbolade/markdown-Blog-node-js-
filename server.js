const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
let methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "descending" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(8000);
