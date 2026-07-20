import { students } from '../data/students.js';
import { courses } from '../data/courses.js';

// קבל כל התלמידים
export const getAllStudentsService = () => {
  return students;
};

// קבל תלמיד לפי ID
export const getStudentByIdService = (id) => {
  const student = students.find(s => s.id === id);
  
  if (!student) {
    throw new Error(`תלמיד עם ID ${id} לא נמצא`);
  }
  
  const enrolledCourses = courses.filter(c => student.enrolledCourses.includes(c.id));
  
  return {
    ...student,
    courseDetails: enrolledCourses
  };
};

// הוסף תלמיד חדש
export const createStudentService = (name, phone, enrolledCourses) => {
  // בדיקה שהשדות קיימים
  if (!name || !phone) {
    throw new Error('חסרים: name או phone');
  }

  const newStudent = {
    id: students[students.length - 1].id + 1,
    name: name,
    phone: phone,
    enrolledCourses: enrolledCourses || []
  };

  students.push(newStudent);
  return newStudent;
};

// עדכן תלמיד
export const updateStudentService = (id, name, phone, enrolledCourses) => {
  if (!name || !phone) {
    throw new Error('חסרים: name או phone');
  }

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    throw new Error(`תלמיד עם ID ${id} לא נמצא`);
  }

  const updatedStudent = {
    id: id,
    name: name,
    phone: phone,
    enrolledCourses: enrolledCourses || []
  };

  students[index] = updatedStudent;
  return updatedStudent;
};

// מחק תלמיד
export const deleteStudentService = (id) => {
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    throw new Error(`תלמיד עם ID ${id} לא נמצא`);
  }

  students.splice(index, 1);
  return { message: `תלמיד עם ID ${id} נמחק בהצלחה` };
};