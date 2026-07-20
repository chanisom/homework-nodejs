import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentsController.js';

const router = express.Router();

// GET - קבל כל התלמידים
router.get('/', getAllStudents);

// GET - קבל תלמיד לפי ID
router.get('/:id', getStudentById);

// POST - הוסף תלמיד חדש
router.post('/', createStudent);

// PUT - עדכן תלמיד
router.put('/:id', updateStudent);

// DELETE - מחק תלמיד
router.delete('/:id', deleteStudent);

export default router;