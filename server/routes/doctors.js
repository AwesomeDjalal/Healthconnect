import express from 'express';
import { authenticateToken, isDoctor } from '../middleware/auth.js';
import pool from '../config/database.js';

const router = express.Router();

// Get all doctors (public route)
router.get('/', async (req, res) => {
  try {
    const [doctors] = await pool.query(
      'SELECT id, first_name, last_name, specialization, phone, schedule FROM doctors'
    );
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get doctor profile
router.get('/profile', authenticateToken, isDoctor, async (req, res) => {
  try {
    const [doctors] = await pool.query(
      'SELECT id, first_name, last_name, specialization, email, phone, schedule FROM doctors WHERE id = ?',
      [req.user.id]
    );

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctors[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update doctor profile
router.put('/profile', authenticateToken, isDoctor, async (req, res) => {
  try {
    const { first_name, last_name, phone, schedule } = req.body;

    await pool.query(
      'UPDATE doctors SET first_name = ?, last_name = ?, phone = ?, schedule = ? WHERE id = ?',
      [first_name, last_name, phone, JSON.stringify(schedule), req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get doctor's appointments
router.get('/appointments', authenticateToken, isDoctor, async (req, res) => {
  try {
    const [appointments] = await pool.query(
      `SELECT a.*, 
        p.first_name as patient_first_name, 
        p.last_name as patient_last_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      WHERE a.doctor_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
      [req.user.id]
    );

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get doctor's availability
router.get('/:id/availability', async (req, res) => {
  try {
    const [doctors] = await pool.query(
      'SELECT schedule FROM doctors WHERE id = ?',
      [req.params.id]
    );

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const schedule = JSON.parse(doctors[0].schedule);
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;