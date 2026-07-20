import {
  getAllEnrollmentsService,
  getEnrollmentByIdService,
  createEnrollmentService,
  deleteEnrollmentService
} from '../services/enrollmentsService.js';
 
// קריאת כל הרישומים
export const getAllEnrollments = (req, res) => {
  const enrollments = getAllEnrollmentsService();
  res.json(enrollments);
};
 
// קריאת רישום לפי ID
export const getEnrollmentById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const enrollment = getEnrollmentByIdService(id);
    res.json(enrollment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
 
// יצירת רישום חדש (רישום תלמיד לקורס)
export const createEnrollment = (req, res) => {
  try {
    const newEnrollment = createEnrollmentService(
      req.body.studentId,
      req.body.courseId
    );
    res.json(newEnrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
 
// מחיקת רישום (ביטול הרשמה)
export const deleteEnrollment = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = deleteEnrollmentService(id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};