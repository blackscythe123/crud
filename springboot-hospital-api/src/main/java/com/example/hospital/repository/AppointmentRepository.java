package com.example.hospital.repository;

import com.example.hospital.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {

    List<Appointment> findByDoctorName(String doctorName);

    List<Appointment> findByStatus(String status);
}
