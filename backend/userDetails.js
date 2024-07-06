const mongoose = require("mongoose");
const userDetailsSchema = new mongoose.Schema({
    fname: String,
    lname:String,
    username:{type:String,unique:true},
    contactno:Number,
    age:Number,
    email: String,
    password: String,
    followers:Array,
    following:Array,
    SavedPosts:Array,
},
{
    collection:"UserInfo"
}
)
const User = mongoose.model("UserInfo",userDetailsSchema);
module.exports = User;