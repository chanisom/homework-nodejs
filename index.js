
import express from 'express';
const app = express();
import chalk from 'chalk';

import coursesRouter, { courses } from './courses.js';
import studentsRouter, { students } from './students.js';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'השרת עובד',
    description: 'זהו שרת Node.js עם Express שמחזיר מידע על הקורסים והתלמידים.'
  });
});


app.use('/courses', coursesRouter);
app.use('/students', studentsRouter);

app.listen(3000, () => {
  console.log('השרת רץ על http://localhost:3000');
  courses.forEach(course => {
    console.log(chalk.red(`id of the course: ${course.id}`));
    console.log(chalk.yellow(`the course: ${course.name}`));
    console.log(chalk.blue(`what in the course? ${course.description}`));
  });
});


