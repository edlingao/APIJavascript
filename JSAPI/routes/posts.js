const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Gets back all the posts
router.get('/', async (req, res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json({message: err})
    }
});
//Submits posts
router.post('/', async (req, res)=>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        
        const savedPost = await post.save();
        res.json(post);
    }
    catch(err){
        res.json({message: err});
    }
});

//Specific Post
router.get('/:PostID', async (req,res) => {
    
    try{
        const post = await Post.findById(req.params.PostID);
        res.json(post);
    }
    catch(err){
        res.json({message: err});
    }
});

router.delete('/:PostID', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.PostID);
        const deletePost = await Post.remove({_id: req.params.PostID});
        res.json(post);
    }
    catch(err){
        res.json({message: err});
    }
});

router.patch('/:PostID', async (req, res)=>{
    try{
        const updatePost = await Post.updateOne({_id: req.params.PostID}, 
            {$set:{
                title: req.body.title,
                description: req.body.description
            }});
        const post = await Post.findById({_id: req.params.PostID});
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});

module.exports = router;