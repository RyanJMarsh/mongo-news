const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/app.models");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(express.json());

// Routes

//Get All Articles
app.get("/news/:topic", async (req, res) => {
  try {
    let query
    if (req.params.topic == "all"){
      query = {}
    } else {
      query = req.params
    }
    const allArticles = await Article.find(query).sort({created_at: "desc"});
    res.json(allArticles);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Article by ID

app.get("/article/:articleId", async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    res.json(article);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Articles by author

app.get("/:author", async (req, res) => {
  try {
    const articlesByAuthor = await Article.find({
      author: String(req.params.author),
    });
    res.json(articlesByAuthor);
  } catch (err) {
    res.json({ message: err });
  }
});
// Add Article to DB

app.post("/news", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    comments: [],
    votes: 0,
  });
  try {
    const savedArticle = await article.save();
    res.json(savedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});


// Patch Article to increase votes

app.patch("/article/:articleId/upvote", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.articleId },
      {
        $inc: {
          votes: 1,
        },
      }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// Patch Article to decrease votes

app.patch("/article/:articleId/downvote", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.articleId },
      {
        $inc: {
          votes: -1,
        },
      }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// Patch Article to add comments

app.patch("/article/:articleId/comments", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.articleId },
      {
        $push: {
          comments: req.body.comment,
        },
      }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// Patch Article to remove comments

app.patch("/article/:articleId/removecomment", async (req, res) => {
    try {
      const updatedArticle = await Article.updateOne(
        { _id: req.params.articleId },
        {
          $pull: {
            comments: req.body,
          },
        }
      );
      res.json(updatedArticle);
    } catch (err) {
      res.json({ message: err });
    }
  });

// Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(console.log("Connected to DB"));

// Listening

app.listen(process.env.PORT || 5000);
