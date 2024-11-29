import express from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';
import pool from '../config/database.js';

const router = express.Router();

// Get all patients
router.get('/patients', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [patients] = await pool.query(
      'SELECT id, first_name, last_name, email, phone, date_of_birth, gender, address FROM patients'
    );
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new doctor
router.post('/doctors', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { first_name, last_name, specialization, email, password, phone, schedule } = req.body;

    // Check if doctor already exists
    const [existingDoctors] = await pool.query('SELECT * FROM doctors WHERE email = ?', [email]);
    if (existingDoctors.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO doctors (first_name, last_name, specialization, email, password_hash, phone, schedule) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, specialization, email, hashedPassword, phone, JSON.stringify(schedule)]
    );

    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update doctor
router.put('/doctors/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { first_name, last_name, specialization, phone, schedule } = req.body;

    await pool.query(
      'UPDATE doctors SET first_name = ?, last_name = ?, specialization = ?, phone = ?, schedule = ? WHERE id = ?',
      [first_name, last_name, specialization, phone, JSON.stringify(schedule), req.params.id]
    );

    res.json({ message: 'Doctor updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete doctor
router.delete('/doctors/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM doctors WHERE id = ?', [req.params.id]);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all appointments
router.get('/appointments', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [appointments] = await pool.query(
      `SELECT a.*, 
        d.first_name as doctor_first_name, 
        d.last_name as doctor_last_name,
        d.specialization,
        p.first_name as patient_first_name,
        p.last_name as patient_last_name
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN patients p ON a.patient_id = p.id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC`
    );

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard statistics
router.get('/statistics', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [[patientCount]] = await pool.query('SELECT COUNT(*) as count FROM patients');
    const [[doctorCount]] = await pool.query('SELECT COUNT(*) as count FROM doctors');
    const [[appointmentCount]] = await pool.query('SELECT COUNT(*) as count FROM appointments');
    const [[completedAppointments]] = await pool.query(
      'SELECT COUNT(*) as count FROM appointments WHERE status = "completed"'
    );

    res.json({
      totalPatients: patientCount.count,
      totalDoctors: doctorCount.count,
      totalAppointments: appointmentCount.count,
      completedAppointments: completedAppointments.count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;