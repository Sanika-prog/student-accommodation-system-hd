require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const roomRoutes = require('./src/routes/roomRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Required marker-check route
app.get('/api/student', (req, res) => {
  res.json({ name: 'Sanika Thelakkadan Chathoth', studentId: '226265671' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/applications', applicationRoutes);

// Serve the frontend
app.use(express.static('public'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();