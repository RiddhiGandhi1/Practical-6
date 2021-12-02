const express = require("express");
const router = express.Router();
router.use(express.json());

const studentModel = require("../Models/Student");

router.get("/", (req, res) => res.send("Student API"));

//Add Student
router.post("/add", async (req, res) => {
    const { newStudent } = req.body;
    studentModel.create(newStudent);
    return res.json({ data : "Student Added!" });
});

//Update Student
router.put("/change/:sid", async (req, res) => {
    const sid = req.params.sid;
    const CourseID = req.body.course_id;
    const updateStudent = await studentModel.findOneAndUpdate(
        { student_id : sid },
        { course_id : CourseID },
        { new : true }
    );
    
    console.log(JSON.stringify(updateStudent));
    return res.json({ data : "Student's Course Updated!" });
});

//Delete Student
router.delete("/delete/:sid", async (req, res) => {
    const sid = req.params.sid;
    const deleteStudent = await studentModel.findOneAndDelete({ student_id : sid });
    console.log(JSON.stringify(deleteStudent));
    return res.json({ data : `Student ${deleteStudent["student_name"]} Deleted` });
});

//Coursewise Student
router.get("/course/:cid", async (req,res) => {
    const CourseID = req.params.cid;
    const studentList = await studentModel.find({ course_id : CourseID });
    return res.json({ data : studentList });
});

//List all Student
router.get("/list", async (req, res) => {
    const studentList = await studentModel.find();
    if(studentList.length === 0) {
        return res.json({ data : "No Student Found:(!" });
    }
    return res.json({ data : studentList });
});

module.exports = router;