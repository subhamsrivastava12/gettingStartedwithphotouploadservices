const Post = require("../models/image");
const dotenv = require("dotenv");

const cloudinary = require("../utils/cloudinary");
dotenv.config();


module.exports.updateImage = async (postId, req) => {
    var data = {};
    var response = {};
    var bool = true;
    const postdata = await Post.findById({ "_id": postId });
    if (req.file) {

        response = await cloudinary.uploader.destroy(postdata.image_id)
            .then((val) => {
                bool = true;
            })
            .catch((err) => {
                bool = false;
                data = { message: err.message, status: 500, output: false };

                return data;
            })
        if (!bool) {
            return response;
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("result", result);
        var updatedPost = {
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url,
            image_id: result.public_id
        };

        response = await Post.findByIdAndUpdate({ "_id": postId }, updatedPost)
            .then((val) => {
                data = { message: "post updated successfully", status: 200, output: true };

                return data;
            })
            .catch((err) => {
                data = { message: err.message, status: 500, output: false };

                return data;
            });
        
        return response;    

    }
    else {
    var updatedPost = {
        title: req.body.title,
        description: req.body.description,
    };

    response= await Post.findByIdAndUpdate({ "_id": postId }, updatedPost)
        .then((val) => {
            data = { message: "post updated successfully", status: 200, output: true };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        });

    return response;
}    
}
