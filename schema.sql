CREATE DATABASE IF NOT EXISTS defaultdb;
USE defaultdb;

CREATE TABLE IF NOT EXISTS volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    emergency_contact VARCHAR(20) NOT NULL,
    organization VARCHAR(150),
    profession VARCHAR(100),
    visit_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    participation_type VARCHAR(50) NOT NULL,
    group_members INT DEFAULT 1,
    additional_group_details TEXT,
    contribution_areas TEXT,
    past_experience VARCHAR(10) DEFAULT 'No',
    health_symptoms VARCHAR(10) DEFAULT 'No',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
