const express = require("express");
const { con } = require("../Config/db");
const { LoginMiddleware } = require("../Middlewares/LoginMiddleware");
const Post_Route = express.Router();
Post_Route.post("/post", LoginMiddleware, (req, res) => {
  const { description, image, userId } = req.body;
  const postquery =
    "INSERT INTO user_posts (description,image,userId) VALUES (?,?,?)";
  con.query(postquery, [description, image, userId], (err, result) => {
    if (err) {
      res.send(err);
    } else if (result) {
      res.send("Post created successfully");
    } else {
      res.send("post unsuccessfull");
    }
  });
});

Post_Route.get("/post", async (req, res) => {
  const userId=req.params.id;
  console.log("i am userid",req.params)
  const query =
    "SELECT user_posts.postId,user_posts.description,user_posts.image,user_posts.timestamp_column,userregistrationdetails.userId,userregistrationdetails.name,userregistrationdetails.email from user_posts JOIN userregistrationdetails ON user_posts.userId=userregistrationdetails.userId";
  con.query(query, (err, result) => {
    try {
      if (err) {
        res.send(err);
      } else if (result) {
        res.send(result);
      } else {
        res.send("getting post some error");
      }
    } catch (err) {
      res.send(err);
    }
  });
});
module.exports = { Post_Route };
