import { courses } from '../data/courses.js';
import { students } from '../data/students.js';

// קריאה כל הקורסים
export const getAllCourses = (req, res) => {
  res.json(courses);
};

// קריאה קורס לפי ID
export const getCourseById = (req, res) => {
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
};

// יצירת קורס חדש
export const createCourse = (req, res) => {
  const newCourse = {
    id: courses[courses.length - 1].id + 1,
    name: req.body.name,
    description: req.body.description
  };

  courses.push(newCourse);
  res.json(newCourse);
};

// עדכון קורס
export const updateCourse = (req, res) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `קורס עם ID ${id} לא נמצא` });
  }

  const updatedCourse = {
    id: id,
    name: req.body.name,
    description: req.body.description
  };

  courses[index] = updatedCourse;
  res.json(updatedCourse);
};

// מחיקת קורס
export const deleteCourse = (req, res) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `קורס עם ID ${id} לא נמצא` });
  }

  courses.splice(index, 1);
  res.json({ message: `קורס עם ID ${id} נמחק בהצלחה` });
};