import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/coursesController.js';

const router = express.Router();

// GET - קבל כל הקורסים
router.get('/', getAllCourses);

// GET - קבל קורס לפי ID
router.get('/:id', getCourseById);

// POST - הוסף קורס חדש
router.post('/', createCourse);

// PUT - עדכן קורס
router.put('/:id', updateCourse);

// DELETE - מחק קורס
router.delete('/:id', deleteCourse);

export default router;