require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection Pool configured for Aiven Cloud
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 12443,
  ssl: { rejectUnauthorized: false }, // Required for Aiven SSL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Registration Endpoint
app.post('/api/volunteers/register', async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      email,
      emergencyContact,
      organization,
      profession,
      visitDate,
      timeSlot,
      participationType,
      groupMembers,
      additionalGroupDetails,
      contributionAreas,
      pastExperience,
      healthSymptoms
    } = req.body;

    const query = `
      INSERT INTO volunteers (
        full_name, contact_number, email, emergency_contact, 
        organization, profession, visit_date, time_slot, 
        participation_type, group_members, additional_group_details, 
        contribution_areas, past_experience, health_symptoms
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const areasString = Array.isArray(contributionAreas) ? contributionAreas.join(', ') : contributionAreas;

    const values = [
      fullName,
      contactNumber,
      email,
      emergencyContact,
      organization,
      profession,
      visitDate,
      timeSlot,
      participationType,
      groupMembers || 1,
      additionalGroupDetails || '',
      areasString || '',
      pastExperience || 'No',
      healthSymptoms || 'No'
    ];

    const [result] = await pool.execute(query, values);

    res.status(201).json({
      success: true,
      message: 'Volunteer registration saved successfully!',
      registrationId: result.insertId
    });
  } catch (error) {
    console.error('MySQL Error:', error);
    res.status(500).json({ success: false, message: 'Database insert failed.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
