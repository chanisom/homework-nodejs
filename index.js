import express from 'express';
import chalk from 'chalk';

import studentsRoutes from './routes/studentsRoutes.js';
import coursesRoutes from './routes/coursesRoutes.js';
import enrollmentsRoutes from './routes/enrollmentsRoutes.js';   // ← חדש
import { courses } from './data/courses.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'השרת עובד',
    description: 'זהו שרת Node.js עם Express שמחזיר מידע על הקורסים, התלמידים והרישומים.'
  });
});

// חיבור ה-Routes
app.use('/students', studentsRoutes);
app.use('/courses', coursesRoutes);
app.use('/enrollments', enrollmentsRoutes);   // ← חדש

app.listen(3000, () => {
  console.log('השרת רץ על http://localhost:3000');
  courses.forEach(course => {
    console.log(chalk.red(`id of the course: ${course.id}`));
    console.log(chalk.yellow(`the course: ${course.name}`));
    console.log(chalk.blue(`what in the course? ${course.description}`));
  });
});