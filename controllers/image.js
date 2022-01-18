const {uploadImage} = require("../services/uploadImage");
const {updateImage} = require("../services/updateImage");
const {deleteImage} = require("../services/deleteImage");


module.exports.uploadImage = async(req,res)=>{
    console.log("reqfiles",req.body);
    uploadImage(req,res)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

module.exports.updateImage = async(req,res)=>{
    var postId=req.params.postId;
    console.log("postid",postId);
    updateImage(postId,req)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

module.exports.deleteImage = async(req,res)=>{
    var postId=req.params.postId;
    deleteImage(postId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}