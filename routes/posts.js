const express = require("express");
const Posts = require("../schemas/posts");

const router = express.Router();

router.get("/posts", async (req, res, next) => {
    try {
        const posts = await Posts.find({}).sort("-postId");
        res.json({ posts: posts });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const posts = await Posts.findOne({ postId: postId });
    res.json({ posts: posts });
});

router.post('/posts', async (req, res) => {
    const { postId, postDate, postAuthor, postTitle, postContent, postPassword } = req.body;
    const posts = await Posts.find({ postId });
	if (posts.length) {
		return res
		  .status(400)
		  .json({ success: false, errorMessage: "이미 있는 데이터입니다. " });
	  }
	  const createdPosts = await Posts.create({ 
		  postId, 
		  postDate, 
		  postAuthor, 
		  postTitle, 
		  postContent, 
		  postPassword 
		})

    res.send({ posts: createdPosts });
});

router.put("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const { postAuthor,postTitle, postContent } = req.body;
   
	const exist_post = await Posts.find({ postId: postId });
    console.log(exist_post)
    if (!exist_post.length) {
        await Posts.create({ postId: postId, postDate, postAuthor, postTitle, postContent, postPassword  });
	}else {	
		await Posts.updateOne({ postId: postId }, { $set: { postAuthor, postTitle, postContent } });
    }
    res.send({ success: true });
});


router.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params

    const deletePost = await Posts.find({ postId: postId });
    if (deletePost.length) {
        await Posts.deleteOne({ postId: postId });
    }
    res.send({ success: true });
});

module.exports = router;