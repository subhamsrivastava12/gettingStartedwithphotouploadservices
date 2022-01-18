const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{type:String, default:''},
    
    description:{type:String, default:''},
    
    image:String,
    
    image_id:String
},{timestamps:true});

module.exports = mongoose.model('Post',postSchema);