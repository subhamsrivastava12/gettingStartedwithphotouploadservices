const Post = require("../models/image");
const dotenv = require("dotenv");
const cloudinary = require("../utils/cloudinary");
dotenv.config();


module.exports.uploadImage=async(req,res)=>{
    var data={};
    var response={};
    console.log("req",req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
        console.log("result",result);
        var post = new Post({
            title:req.body.title,
            description:req.body.description,
            image:result.secure_url,
            image_id:result.public_id
        });

    response = await post.save()
               .then((val)=>{
                    data={message:"image uploaded successfully",status:201,output:true};
                    return data;
               })
               .catch((err)=>{
                    data={message:err.message,status:500,output:false};
                    return data;
               })
            
        

    return response;    

    
}
