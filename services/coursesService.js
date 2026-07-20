import { courses } from '../data/courses.js';
import { students } from '../data/students.js';

// קבל כל הקורסים
export const getAllCoursesService = () => {
  return courses;
};

// קבל קורס לפי ID
export const getCourseByIdService = (id) => {
  const course = courses.find(c => c.id === id);

  if (!course) {
    throw new Error(`קורס עם ID ${id} לא נמצא`);
  }

  const enrolledStudents = students.filter(s => s.enrolledCourses.includes(id));

  return {
    ...course,
    students: enrolledStudents
  };
};

// הוסף קורס חדש
export const createCourseService = (name, description) => {
  // בדיקה שהשדות קיימים
  if (!name || !description) {
    throw new Error('חסרים: name או description');
  }

  const newCourse = {
    id: courses[courses.length - 1].id + 1,
    name: name,
    description: description
  };

  courses.push(newCourse);
  return newCourse;
};

// עדכן קורס
export const updateCourseService = (id, name, description) => {
  if (!name || !description) {
    throw new Error('חסרים: name או description');
  }

  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    throw new Error(`קורס עם ID ${id} לא נמצא`);
  }

  const updatedCourse = {
    id: id,
    name: name,
    description: description
  };

  courses[index] = updatedCourse;
  return updatedCourse;
};

// מחק קורס
export const deleteCourseService = (id) => {
  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    throw new Error(`קורס עם ID ${id} לא נמצא`);
  }

  courses.splice(index, 1);
  return { message: `קורס עם ID ${id} נמחק בהצלחה` };
};