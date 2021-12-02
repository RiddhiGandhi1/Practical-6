const express = require("express");
const router = express.Router();
router.use(express.json());

const courseModel = require("../Models/Course");

router.get("/", (req, res) => res.send("course API"));

//Add Course
router.post("/add", async (req, res) => {
    const { newCourse } = req.body;
    courseModel.create(newCourse);
    return res.json({ data : "Course Added!" });
});

//Update Course
router.put("/change/:cid", async (req, res) => {
    const cid = req.params.cid;
    const StudentID = req.body.student_id;
    const updateCourse = await courseModel.findOneAndUpdate(
        { course_id : cid },
        { student_id : StudentID },
        { new : true }
    );
    
    console.log(JSON.stringify(updateCourse));
    return res.json({ data : "Course's Student Updated!" });
});

//Delete Course
router.delete("/delete/:cid", async (req, res) => {
    const cid = req.params.cid;
    const deleteCourse = await courseModel.findOneAndDelete({ course_id : cid });
    console.log(JSON.stringify(deleteCourse));
    return res.json({ data : `Course ${ deleteCourse["course_name"]} Deleted` });
});

//Course List Based on Student Name
router.get("/course/:StudentName", async (req,res) => {
    const StudentName = req.params.StudentName;
    const studentModel = require("../Models/Student");
    const student = await studentModel.findOne({ student_name : StudentName });

    if (student == null || student.length < 0) {
        return res.json({ data : "No Student Found:(!" });
    } else {
        const courseList = await courseModel.find({ student_id : student["student_id"] });
        if (courseList.length === 0) {
            return res.json({ data : "No Course Found:(!" });
        }
        return res.json({ data : courseList });
    }
});

//List all Course
router.get("/List", async (req, res) => {
    const courseList = await courseModel.find();
    if (courseList.length === 0) {
        return res.json({ data : "No Course Found:(!" });
    }
    return res.json({ data : courseList });
});

module.exports = router;