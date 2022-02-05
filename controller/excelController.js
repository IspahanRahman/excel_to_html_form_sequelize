const db = require("../config/database");
const Course = db.courses;

const readXlsxFile = require("read-excel-file/node");

exports.excelPageController=async(req,res)=>{
  return res.render('excel_convert');
}
exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path ="public/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let courses = [];

      rows.forEach((row) => {
        let course = {
          course_name: row[0],
          course_code: row[1],
          course_credti: row[2],
          course_type: row[3],
          session_id:row[4],
          department_id:row[5]
        };

        courses.push(course);
      });

      Course.bulkCreate(courses)
        .then(() => {
          res.redirect('/excel/courses')
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

exports.getCourses = (req, res) => {
  Course.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses.",
      });
    });
};
