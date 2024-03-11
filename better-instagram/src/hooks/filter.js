const express = require('express');
const cors = require('cors');
const app = express();
const port = 5173;

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Sample data of users
const users = [
  { id: 1, username: 'user1', major: 'Computer Science', graduationYear: 2023 },
  { id: 2, username: 'user2', major: 'Electrical Engineering', graduationYear: 2022 },
  { id: 3, username: 'user3', major: 'Mathematics', graduationYear: 2023 },
  // Add more sample users as needed
];

// Endpoint for searching users by major and graduation year
app.get('/users', (req, res) => {
  const { major, graduationYear } = req.query;
  
  let filteredUsers = users;

  if (major) {
    filteredUsers = filteredUsers.filter(user => user.major.toLowerCase().includes(major.toLowerCase()));
  }

  if (graduationYear) {
    filteredUsers = filteredUsers.filter(user => user.graduationYear === parseInt(graduationYear));
  }

  res.json(filteredUsers);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});