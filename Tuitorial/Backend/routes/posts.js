// routes/posts.js
/*import express from "express";
import  router  from "express";
const router = express.Router();
const Post = require("../models/postSchema");*/

/*
import express from "express";
import Post from "../models/postSchema.js";
const router = express.Router();


// --- INDEX Route: GET /posts ---
router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.find({});
        res.render("allPosts.ejs", { allPosts });
    } catch (err) {
        res.status(500).send("Error loading posts.");
    }
});

// --- NEW Route: GET /posts/new ---
router.get("/new", (req, res) => {
    res.render("newPost.ejs");
});

// --- SHOW Route: GET /posts/:id ---
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send("Post not found.");
        res.render("postShow.ejs", { post });
    } catch (err) {
        res.status(500).send("Error loading post details.");
    }
});

// --- CREATE Route: POST /posts ---
router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.redirect("/posts");
    } catch (err) {
        res.status(400).send("Failed to create post due to validation errors.");
    }
});

// --- EDIT Route: GET /posts/:id/edit ---
router.get("/:id/edit", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send("Post not found for editing.");
        res.render("editPost.ejs", { post });
    } catch (err) {
        res.status(500).send("Error loading edit form.");
    }
});

// --- UPDATE Route: PUT /posts/:id ---
router.put("/:id", async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
        res.status(400).send("Failed to update post.");
    }
});

// --- DELETE Route: DELETE /posts/:id ---
router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/posts");
    } catch (err) {
        res.status(500).send("Failed to delete post.");
    }
});

// ----------------------------------------------------
// --- Interactive Routes ---
// ----------------------------------------------------

// --- COMMENT Route: POST /posts/:id/comments ---
router.post("/:id/comments", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send("Post not found for comment.");

        const newComment = {
            author: req.body.author, 
            text: req.body.text     
        };
        
        post.comments.push(newComment); 
        await post.save();
        
        res.redirect(`/posts/${req.params.id}`); 
    } catch (err) {
        res.status(500).send("Failed to submit comment.");
    }
});

// --- LIKE Route: POST /posts/:id/like ---
router.post("/:id/like", async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
        res.redirect(`/posts/${req.params.id}`); 
    } catch (err) {
        res.status(500).send("Failed to like post.");
    }
});



export default router; */

import express from "express";
import Post from "../models/postSchema.js";

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single post by id
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
