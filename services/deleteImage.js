const Post = require("../models/image");
const dotenv = require("dotenv");
const cloudinary = require("../utils/cloudinary");
dotenv.config();


module.exports.deleteImage=async(postId)=>{
    var data={};
    var response={};
    var bool=true;
    const postdata=await Post.findById({"_id":postId});
    console.log("image_id",postdata.image_id);
    response = await cloudinary.uploader.destroy(postdata.image_id)
            .then((val) => {
                bool = true;
            })
            .catch((err) => {
                bool = false;
                data = { message: err.message, status: 500, output: false };

                return data;
            })
    if(!bool){
        return response;
    }            

    response=await Post.findOneAndRemove({"_id":postId})
                .then((val)=>{
                    data={message:"post deleted successfully",status:200,output:true};
                
                    return data;
                })
                .catch((err)=>{
                    data={message:err.message,status:500,output:false};
                
                    return data;
                })
            
        

    return response;
}
