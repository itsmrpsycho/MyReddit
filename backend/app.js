const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://admin:admin@cluster0.psedkhp.mongodb.net/?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => { console.log("Connected to database"); })
    .catch(e => console.log(e));
app.use(express.json())
const cors = require("cors")
app.use(cors());
const bcrypt = require("bcryptjs");
app.listen(3001, () => {
    console.log("Server started!")
})
// app.post("/post",async(req,res)=>{ //send request and recieve resopnse
//     console.log(req.body);
//     const {data}=req.body;
//     try{
//         if(data=="admin"){
//             res.send({status:"ok"});
//         }
//         else{
//             res.send({status:"User not found"})
//         }
//     }catch(error){
//         res.send({status:"Something went wrong,try again!"})

//     }
// });
require("./userDetails");
// const User=mongoose.model("UserInfo");
// const User = require('./userDetails')
const User = require("./userDetails.js")
const Subgredditdata = require("./subGredditdetails.js");
const Postsdata = require("./postdetails.js")

app.post("/register", async (req, res) => {
    const { fname, lname, email, age, username, contactno, password } = req.body;
    // console.log(req.body)
    // const encryptedpassword =  bcrypt.hash(password, 12);
    // console.log(encryptedpassword);
    try {
        const oldUser = await User.findOne({ username: username });
        if (oldUser) {
            return res.send({ error: "User Exists!" })

        }
        const new_user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            contactno: req.body.contactno,
            age: req.body.age,
            password: req.body.password
            // password:encryptedpassword
        })
        new_user.save()
            .then((response) => {
                // console.log("hiii");
                res.send({ message: 1 });
            })
        // await User.create({ //creating user in MongoDB
        //     uname:req.body.fname,
        //     lname:req.body.lname,
        //     username:req.body.username,
        //     email:req.body.email,
        //     contactno:req.body.contactno,
        //     age:req.body.age,
        //     // password:req.body.password
        //     password:encryptedpassword
        // });

    }
    catch (error) {
        res.send({ status: "error" });
        // console.log('errorrrr')
    }
})
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body)
    const user = await User.findOne({ username: username });
    // console.log(user);
    if (!user) {
        return res.status(401).json({ message: "Wrong Username" });
    }
    else {
        if (user.password === password) {
            // console.log("HIJKJHK")
            return res.status(200).json({ message: "Logged In", user: user });
            // res.send(user);
        }
        else {
            return res.status(401).json({ message: "Password Incorrect,Try Again!" });
        }
    }

})

app.post("/getuserdata", async (req, res) => {
    // console.log("HIi!");
    const { username } = req.body;
    // console.log(username)
    // console.log(req.body)
    const user = await User.findOne({ username: username });
    // console.log(user);
    res.json(user)
})

app.post("/subGredditentry", async (req, res) => {
    const { Name, Description, bannedKeywords, Tags, moderator ,follower} = req.body;
    try {
        const oldUser = await Subgredditdata.findOne({ Name: Name });
        if (oldUser) {
            return res.send({ error: "Name already Exists!" })

        }
        const new_subGreddit = new Subgredditdata({
            moderator: req.body.userData,
            Name: req.body.name,
            Description: req.body.description,
            bannedKeywords: req.body.bannedKeywords,
            Tags: req.body.tags,
            Followers:[req.body.userData],
        })
        new_subGreddit.save()
        await Postsdata.updateOne(
            { Name: req.body.name },
            { $push: { Comments: req.body.comments } } ,
        )

            .then((response) => {
                // console.log("hiii");
                res.send({ message: 1 });
            })
    }
    catch (error) {
        res.send({ status: "error" });
        // console.log('errorrrr')
    }
})

app.post("/getmysubgreddits", async (req, res) => {
    // const { Name, Description, bannedKeywords, Tags, moderator } = req.body;
    try {

        // const temp=user.username
        const username = req.body.username;
        const subarray = await Subgredditdata.find({ moderator: username });
        // console.log(subarray);
        res.send({ subarray: subarray });
    }
    catch (error) {
        console.log("error", error);
        res.send({ status: "error" });
        // console.log('errorrrr')
    }

})
app.post("/getsubgreddits", async (req, res) => {
    try {
        // const user=req.body.user
        const subarray = await Subgredditdata.find({});
        // console.log(subarray);

        res.send({ subarray: subarray });
    }
    catch (error) {
        console.log("error", error);
        res.send({ status: "error" });
    }

})
app.post("/postentry", async (req, res) => {
    // const { name,description,author } = req.body;
    try {
        const new_Post = new Postsdata({
            Name: req.body.subGname,
            Description: req.body.description,
            Author: req.body.userData,
        })
        new_Post.save()
            .then((response) => {
                // console.log("hiii");
                res.send({ message: "Post Created!" });
            })
    }
    catch (error) {
        res.send({ status: "error" });
        // console.log('errorrrr')
    }
})
app.post("/displaysub", async (req, res) => {
    try {
        const user = req.body.subG;
        // console.log(req.body);
        const subarray = await Subgredditdata.find({ Name: user });
        // console.log(subarray);
        res.send({ subarray: subarray });
        // console.log("hiiiii")
    }
    catch (error) {
        console.log("error", error);
        res.send({ status: "error" });
        // console.log('errorrrr')
    }

})
app.post("/displayposts", async (req, res) => {
    try {
        const user = req.body.post;
        const subarray = await Postsdata.find({ Name: user });
        // console.log(subarray);
        res.send({ subarray: subarray });
    }
    catch (error) {
        console.log("error", error);
        res.send({ status: "error" });
        // console.log('errorrrr')
    }

})
app.post("/commententry", async (req, res) => {
    // console.log('commentinggg')
    // console.log(req.body);
    // const { name,description,author } = req.body;
    try {
        // const existing_Post = await Postsdata.find({ _id: req.body._id });
        await Postsdata.updateOne(
            { _id: req.body.postid },
            { $push: { Comments: req.body.comments } } ,
        )
    .then((response) => {
        // console.log("hiii");
        res.send({ message: "Comment Added!" });
    })
    }
    catch (error) {
    res.send({ status: "error" });
    // console.log('errorrrr')
}
})
app.post("/follow", async(req, res) => {
    const{user1,user2}=req.body;
    // console.log(user1,user2);
    // const { name,description,author } = req.body;
    try {
        // const existing_Post = await Postsdata.find({ _id: req.body._id });
        await User.updateOne(
            { username: req.body.user1 },
            {$push:{following:req.body.user2}},
            // { $push: { Comments: req.body.comments } } ,
        )
        await User.updateOne(
            { username: req.body.user2 },
            {$push:{followers:req.body.user1}},
            // { $push: { Comments: req.body.comments } } ,
        )
    .then((response) => {
        // console.log("hiii");
        res.send({ message: " Follower added" });
    })
    }
    catch (error) {
    res.send({ status: "error" });
    // console.log('errorrrr')
}
})
app.post("/upvote", async(req, res) => {
    const{post,user}=req.body;
    // console.log(req.body);
    try {
        // console.log(post);
        // console.log(req.body.postId);
        // console.log(req.body.user)
        await Postsdata.updateOne(
            {_id:req.body.postId},
            {$push:{Upvote:req.body.Username}},
        )
    .then((response) => {
        // console.log("hiii");
        res.send({ message: " Upvoted " });
    })
    }
    catch (error) {
    res.send({ status: "error" });
    // console.log('errorrrr')
}
})
app.post("/downvote", async(req, res) => {
    const{post,user}=req.body;
    // console.log(req.body);
    try {
        // console.log(req.body.postId),
        await Postsdata.updateOne(
            {_id:req.body.postId},
            {$push:{Downvote:req.body.Username}} ,
        )
    .then((response) => {
        // console.log("hiii");
        res.send({ message: "Downvoted " });
    })
    }
    catch (error) {
    res.send({ status: "error" });
    // console.log('errorrrr')
}
})
app.post("/savepost", async(req, res) => {
    // const{post}=req.body;
    try {
        // console.log(req.body);
        await User.updateOne(
            {username:req.body.Username},
            { $push: { SavedPosts:req.body.postId} } ,
        )
    .then((response) => {
        // console.log("hiii");
        res.send({ message: "Post Saved!" });
    })
    }
    catch (error) {
    res.send({ status: "error" });
    // console.log('errorrrr')
}
})
app.post("/displaysavedpost", async(req, res) => {
    try {
        const username = req.body.username;
        // console.log(user);
        const user = await User.findOne({ username:username });
    
        // console.log(user.SavedPosts);
        const saved = await Postsdata.find({ _id: { $in: user.SavedPosts} });
        // console.log(saved);
        res.send(saved);

    }
    catch (error) {
        console.log("error", error);
        res.send({ status: "error" });
        // console.log('errorrrr')
    }
})
app.post("/followsubg", async(req, res) => {
    const{user1,subg}=req.body;
    // console.log(user1,user2);
        const array=await Subgredditdata.updateOne(
            { Name: req.body.subg ,Followers:{$nin :req.body.user1 }},
            {$push:{Joinrequests:req.body.user1}}
            );

        // console.log(array);    
        
        if(array.modifiedCount===0){
            res.send('User request already exists')
        }
        else{
            res.send("User added to join request:")
            // console.log(array);
        }
})
app.post("/checkmodsubg", async(req, res) => {
        // console.log(req.body);
        const array=await Subgredditdata.findOne({
            $and: [
                { moderator: req.body.username},
                { Name:req.body.subG},
              ],
            
            })
            if (!array) {
                // console.log("HIJKJHK");
                res.send({ message: 0 });
                // res.send(user);
            }
            else{
                res.send({message:1});
            }
})
app.post("/displaysubjoin", async (req, res) => {
    try {
        const user = req.body.subG;
        // console.log("hiiiii");
        // console.log(req.body);
        const subarray = await Subgredditdata.findOne({ Name: user });
        // console.log(subarray);
        res.send(subarray);
        // console.log("hiiiii")
    }
    catch (error) {
        console.log("error", error);
        res.send({ status: "error" });
        // console.log('errorrrr')
    }

})
app.post("/accept", async (req, res) => {
        console.log("HIIIII");
        const username=req.body.user;
        const subGName=req.body.subG;
        console.log(req.body);
        // find sub greddit object using it's name
        // find if username is present in joinrequest
        // remove that username from joint request and add it to followers
        const subGObject=await Subgredditdata.findOne({Name:subGName});
        console.log(subGObject);
        const result=subGObject.Joinrequests.includes(username)//returns boolean
        console.log(result);
        if(result){
            await Subgredditdata.updateOne(
                { Name: subGName },
                {
                    $pull:{Joinrequests:username},
                    $push:{Followers:username}
                }   
            );
            res.send("Follow request acccepted");
        }
        else{
            res.send("Follow request not sent");
        }
    
}
)
app.post("/reject", async (req, res) => {
        console.log("HIIIII");
        const username=req.body.user;
        const subGName=req.body.subG;
        
        console.log(req.body);
        // find sub greddit object using it's name
        // find if username is present in joinrequest
        // remove that username from joint request 
        try{
        const subGObject=await Subgredditdata.findOne({Name:subGName});
        console.log(subGObject);
        const result=subGObject.Joinrequests.includes(username)//returns boolean
        if(result){
            await Subgredditdata.updateOne(
                { Name: subGName },
                {
                    $pull:{Joinrequests:username}
                }   
            );
            res.send("Follow request rejected");
        }
        else{
            res.send("Follow request doesnt exist");
        }
        }
        catch(err){
            console.log(err);
        }
    }
)


