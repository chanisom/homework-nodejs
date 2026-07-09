import express from 'express';

import { courses } from './courses.js';

const router = express.Router();


export const students = [
  {
    id: 101,
    name: "david",
    phone: "0520520520",
    enrolledCourses: [1, 2]
  },
  {
    id: 102,
    name: "sara",
    phone: "0533112233",
    enrolledCourses: [1, 3, 4]
  },
  {
    id: 103,
    name: "michael",
    phone: "0544455666",
    enrolledCourses: [2, 5]
  },
  {
    id: 104,
    name: "chana",
    phone: "0555566777",
    enrolledCourses: [1, 4, 5]
  },
  {
    id: 105,
    name: "yosef",
    phone: "0566677889",
    enrolledCourses: [3, 4]
  }
];


router.get('/', (req, res) => {
  res.json(students);
});


router.get('/:id', (req, res) => {
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
});

router.post('/', (req, res) => {
  const newStudent = {
    id: students[students.length - 1].id + 1,
    name: req.body.name,
    phone: req.body.phone,
    enrolledCourses: req.body.enrolledCourses || [] // אם לא נשלח, מערך ריק
  };

  students.push(newStudent);

  res.json(newStudent);
});

router.put('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `תלמיד עם ID ${id} לא נמצא` });
  }

  students.splice(index, 1);

  res.json({ message: `תלמיד עם ID ${id} נמחק בהצלחה` });
});

export default router;
