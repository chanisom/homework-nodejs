import { enrollments } from '../data/enrollments.js';
import { students } from '../data/students.js';
import { courses } from '../data/courses.js';

// קבל את כל הרישומים
export const getAllEnrollmentsService = () => {
  return enrollments;
};

// קבל רישום לפי ID
export const getEnrollmentByIdService = (id) => {
  const enrollment = enrollments.find(e => e.id === id);

  if (!enrollment) {
    throw new Error(`רישום עם ID ${id} לא נמצא`);
  }

  return enrollment;
};

// הוסף רישום חדש (רישום תלמיד לקורס)
export const createEnrollmentService = (studentId, courseId) => {
  // בדיקה שהשדות קיימים
  if (!studentId || !courseId) {
    throw new Error('חסרים: studentId או courseId');
  }

  // בדיקה שהתלמיד קיים
  const studentExists = students.find(s => s.id === studentId);
  if (!studentExists) {
    throw new Error(`תלמיד עם ID ${studentId} לא נמצא`);
  }

  // בדיקה שהקורס קיים
  const courseExists = courses.find(c => c.id === courseId);
  if (!courseExists) {
    throw new Error(`קורס עם ID ${courseId} לא נמצא`);
  }

  // בדיקה שהתלמיד לא כבר רשום לקורס הזה
  const alreadyEnrolled = enrollments.find(
    e => e.studentId === studentId && e.courseId === courseId
  );
  if (alreadyEnrolled) {
    throw new Error(`התלמיד כבר רשום לקורס הזה`);
  }

  const newEnrollment = {
    id: enrollments[enrollments.length - 1].id + 1,
    studentId: studentId,
    courseId: courseId
  };

  enrollments.push(newEnrollment);
  return newEnrollment;
};

// מחק רישום (ביטול הרשמה לקורס)
export const deleteEnrollmentService = (id) => {
  const index = enrollments.findIndex(e => e.id === id);

  if (index === -1) {
    throw new Error(`רישום עם ID ${id} לא נמצא`);
  }

  enrollments.splice(index, 1);
  return { message: `רישום עם ID ${id} נמחק בהצלחה` };
};