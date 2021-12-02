const mongooose = require("mongoose");

//Student Schema
const studentSchema = mongooose.Schema({
    student_id : String,
    student_name : String,
    age : String,
    city : String,
    course_id : Array
});

const studentModel = mongooose.model("Students", studentSchema, "Students");

module.exports = studentModel;
