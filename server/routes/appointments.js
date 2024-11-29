import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/database.js';

const router = express.Router();

// Book new appointment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { doctor_id, appointment_date, appointment_time } = req.body;

    // Check if doctor exists
    const [doctors] = await pool.query('SELECT * FROM doctors WHERE id = ?', [doctor_id]);
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if slot is available
    const [existingAppointments] = await pool.query(
      'SELECT * FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status != "canceled"',
      [doctor_id, appointment_date, appointment_time]
    );

    if (existingAppointments.length > 0) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    // Create appointment
    await pool.query(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)',
      [req.user.id, doctor_id, appointment_date, appointment_time]
    );

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appointmentId = req.params.id;

    // Check if appointment exists and belongs to user
    const [appointments] = await pool.query(
      'SELECT * FROM appointments WHERE id = ? AND (patient_id = ? OR doctor_id = ?)',
      [appointmentId, req.user.id, req.user.id]
    );

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await pool.query(
      'UPDATE appointments SET status = ? WHERE id = ?',
      [status, appointmentId]
    );

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get appointment details
router.get('/:id', authenticateToken, async (req, res) => {
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
      WHERE a.id = ? AND (a.patient_id = ? OR a.doctor_id = ?)`,
      [req.params.id, req.user.id, req.user.id]
    );

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointments[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;