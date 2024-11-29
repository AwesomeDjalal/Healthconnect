-- Create database
CREATE DATABASE IF NOT EXISTS telemedicine_db;
USE telemedicine_db;

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender ENUM('male', 'female', 'other'),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  schedule JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin table
CREATE TABLE IF NOT EXISTS admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role ENUM('admin') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('scheduled', 'completed', 'canceled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Sample data for testing
INSERT INTO admin (username, password_hash, email) VALUES
('admin', '$2a$10$your_hashed_password', 'admin@healthconnect.com');

INSERT INTO doctors (first_name, last_name, specialization, email, password_hash, phone, schedule) VALUES
('Sarah', 'Johnson', 'Primary Care', 'sarah.johnson@healthconnect.com', '$2a$10$your_hashed_password', '+1234567890', '{"monday": ["09:00", "17:00"], "tuesday": ["09:00", "17:00"]}'),
('Michael', 'Chen', 'Cardiology', 'michael.chen@healthconnect.com', '$2a$10$your_hashed_password', '+1234567891', '{"wednesday": ["10:00", "18:00"], "thursday": ["10:00", "18:00"]}'),
('Emily', 'Rodriguez', 'Mental Health', 'emily.rodriguez@healthconnect.com', '$2a$10$your_hashed_password', '+1234567892', '{"friday": ["09:00", "17:00"], "saturday": ["10:00", "15:00"]}');