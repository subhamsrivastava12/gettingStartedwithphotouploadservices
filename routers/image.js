const express = require("express");
const { getImage,uploadImage , updateImage,deleteImage } = require("../controllers/image");
const router = express.Router();
const upload = require("../utils/multer");

router.get('/',getImage);
router.post('/',upload.single("image"),uploadImage);
router.put('/:postId',upload.single("image"),updateImage);
router.delete('/:postId',deleteImage);

module.exports = router;