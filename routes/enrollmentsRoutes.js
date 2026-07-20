import express from 'express';
import {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  deleteEnrollment
} from '../controllers/enrollmentsController.js';

const router = express.Router();

// GET - קבל את כל הרישומים
router.get('/', getAllEnrollments);

// GET - קבל רישום לפי ID
router.get('/:id', getEnrollmentById);

// POST - הוסף רישום חדש (רישום תלמיד לקורס)
router.post('/', createEnrollment);

// DELETE - מחק רישום (ביטול הרשמה)
router.delete('/:id', deleteEnrollment);

export default router;