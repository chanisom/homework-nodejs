import express from 'express';
import { students } from './students.js';

const router = express.Router();

export const courses = [
  {
    id: 1,
    name: "JavaScript",
    description: "קורס למתחילים בתכנות JavaScript"
  },
  {
    id: 2,
    name: "english",
    description: "know english well!!"
  },
  {
    id: 3,
    name: "Node.js ו-Express",
    description: "פיתוח backend"
  },
  {
    id: 4,
    name: "html & css",
    description: "בניה ועיצוב אתרים"
  },
  {
    id: 5,
    name: "SQL ומסדי נתונים",
    description: "עבודה עם מסדי נתונים"
  }
];

router.get('/', (req, res) => {
  res.json(courses);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).json({ error: `קורס עם ID ${id} לא נמצא` });
  }

  const enrolledStudents = students.filter(s => s.enrolledCourses.includes(id));

  const courseWithStudents = {
    ...course,
    students: enrolledStudents
  };

  res.json(courseWithStudents);
});

router.post('/', (req, res) => {
  const newCourse = {
    id: courses[courses.length - 1].id + 1, // ID חדש = האחרון + 1
    name: req.body.name,
    description: req.body.description
  };

  courses.push(newCourse); // מוסיפים למערך

  res.json(newCourse); // מחזירים את הקורס החדש
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `קורס עם ID ${id} לא נמצא` });
  }

  const updatedCourse = {
    id: id, // ה-ID נשאר אותו דבר
    name: req.body.name,
    description: req.body.description
  };

  courses[index] = updatedCourse; // מחליפים במקום

  res.json(updatedCourse);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `קורס עם ID ${id} לא נמצא` });
  }

  courses.splice(index, 1); // מוחקים מהמערך

  res.json({ message: `קורס עם ID ${id} נמחק בהצלחה` });
});

export default router;
