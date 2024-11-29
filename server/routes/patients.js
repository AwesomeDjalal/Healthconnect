import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/database.js';

const router = express.Router();

// Get patient profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [patients] = await pool.query(
      'SELECT id, first_name, last_name, email, phone, date_of_birth, gender, address FROM patients WHERE id = ?',
      [req.user.id]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patients[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update patient profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { first_name, last_name, phone, address } = req.body;

    await pool.query(
      'UPDATE patients SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?',
      [first_name, last_name, phone, address, req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete patient account
router.delete('/profile', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM patients WHERE id = ?', [req.user.id]);
    res.clearCookie('token');
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get patient appointments
router.get('/appointments', authenticateToken, async (req, res) => {
  try {
    const [appointments] = await pool.query(
      `SELECT a.*, 
        d.first_name as doctor_first_name, 
        d.last_name as doctor_last_name,
        d.specialization
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.patient_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
      [req.user.id]
    );

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;