const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const dbPath = path.join(__dirname, 'student_data.db');
const db = new sqlite3.Database(dbPath);

app.use(express.json());

app.get('/api/students', (req, res) => {
  const sql = `
        SELECT
            sno,
            studentrollno,
            studentname,
            coursename,
            tpmark,
            noofdayspresent,
            collegename,
            universityname,
            district
        FROM studentsmarks
        ORDER BY sno;
    `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Restructure the data (more common format for frontend)
    const students = rows.map((row) => ({
      sno: row.sno,
      rollNo: row.studentrollno, // Use camelCase for consistency
      name: row.studentname,
      course: row.coursename,
      tpMark: row.tpmark,
      daysPresent: row.noofdayspresent,
      college: row.collegename,
      university: row.universityname,
      district: row.district,
    }));

    res.json(students); // Send JSON response
  });
});

// Serve static files from the React app (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

db.on('error', (err) => {
  console.error('Database error:', err.message);
});
