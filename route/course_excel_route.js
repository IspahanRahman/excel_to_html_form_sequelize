const express = require("express");
const router = express.Router();
const {excelPageController,upload,getCourses} = require("../controller/excelController");
const uploadFile = require("../middleware/upload");

router.get("/",excelPageController)
router.post("/upload", uploadFile.single("myfile"),upload);
router.get("/courses", getCourses);



module.exports = router;