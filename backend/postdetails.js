const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    Author:String,
    Upvote:Array,
    Downvote:Array,
    Comments:Array,
},
{
    collection:"PostInfo"
}
)
const Postsdata = mongoose.model("PostInfo",PostsSchema);
module.exports =Postsdata;