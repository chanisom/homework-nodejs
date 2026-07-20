import { students } from '../data/students.js';
import { courses } from '../data/courses.js';

// קריאה כל התלמידים
export const getAllStudents = (req, res) => {
  res.json(students);
};

// קריאה תלמיד לפי ID
export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: `תלמיד עם ID ${id} לא נמצא` });
  }
  
  const enrolledCourses = courses.filter(c => student.enrolledCourses.includes(c.id));
  
  const studentWithCourses = {
    ...student,
    courseDetails: enrolledCourses
  };
  
  res.json(studentWithCourses);
};

// יצירת תלמיד חדש
export const createStudent = (req, res) => {
  const newStudent = {
    id: students[students.length - 1].id + 1,
    name: req.body.name,
    phone: req.body.phone,
    enrolledCourses: req.body.enrolledCourses || []
  };

  students.push(newStudent);
  res.json(newStudent);
};

// עדכון תלמיד
export const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `תלמיד עם ID ${id} לא נמצא` });
  }

  const updatedStudent = {
    id: id,
    name: req.body.name,
    phone: req.body.phone,
    enrolledCourses: req.body.enrolledCourses || []
  };

  students[index] = updatedStudent;
  res.json(updatedStudent);
};

// מחיקת תלמיד
export const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `תלמיד עם ID ${id} לא נמצא` });
  }

  students.splice(index, 1);
  res.json({ message: `תלמיד עם ID ${id} נמחק בהצלחה` });
};