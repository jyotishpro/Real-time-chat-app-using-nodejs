const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat");

const chatSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        chat:{type:String, required:true},
    }
);
module.exports= mongoose.model('chat-store',chatSchema);