const Posts = require('../models/Posts'); // Model Post

class PostsController {
    async findPosts(req,res,next){
        try {
            const posts = await Posts.find({user : req.userId});

            res.json({success : true, posts});
        } catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Internal server error"});
        }
    }

    async deletePost(req,res,next){
        const condition = {_id : req.params.id, user : req.userId}

        try {
            const postDelete = await Posts.findOneAndDelete(condition);

            res.json({success: true, messgae : "Post deleted successfully"});
        } catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Internal server error"})
        }
    }

    async updatePost(req,res,next){
        const {title ,description ,src ,url ,status} = req.body;
        const condition = {_id : req.params.id , user : req.userId}
        if(!title){
            return res
            .status(400)
            .json({success : false, message : "Title is required"});
        }
        try {
            let postUpdate = {
                title,
                description : description || '',
                src: src || '',
                url: url.startsWith('https://') ? url : `https://${url}`,
                status : status || 'TO LEARN',
            }
            postUpdate = await Posts.findOneAndUpdate(condition, postUpdate, {new : true});
            
            if(!postUpdate)
                return res.status(400).json({
                    success : false, message : "Post not found or user not authorised"
                })
                
            res.json({success : true, message : 'Post updated successfully!', postUpdate});
        } catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Internal server error"})
        }
    }


    async createPost(req,res,next){
        const {title ,description ,src ,url ,status} = req.body;
        if(!title){
            return res
            .status(400)
            .json({success : false, message : "Title is required"});
        }
        try {
            const newPost = new Posts({
                title,
                description,
                src,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status : status || 'TO LEARN',
                user : req.userId,
            })

            await newPost.save();

            res.json({
                success : true, message : 'Happy Learning!', post : newPost
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Internal server error"})
        }
        
    }
}

module.exports = new PostsController();