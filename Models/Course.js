const mongooose = require("mongoose");

//Course Schema
const courseSchema = mongooose.Schema({
    course_id : String,
    course_name : String,
    student_id : Array
});

const courseModel = mongooose.model("Courses", courseSchema);

module.exports = courseModel;