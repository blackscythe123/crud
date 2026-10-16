package com.example.hospital.service;

import com.example.hospital.model.Appointment;
import com.example.hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(String id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    public Appointment bookAppointment(Appointment appointment) {
        if (appointment.getId() != null && appointment.getId().trim().isEmpty()) {
            appointment.setId(null);
        }
        if (appointment.getStatus() == null || appointment.getStatus().trim().isEmpty()) {
            appointment.setStatus("PENDING");
        }
        return appointmentRepository.save(appointment);
    }

    public Appointment updateStatus(String id, String status) {
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment != null) {
            appointment.setStatus(status);
            return appointmentRepository.save(appointment);
        }
        return null;
    }

    public void cancelAppointment(String id) {
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAppointmentsByDoctorName(String doctorName) {
        return appointmentRepository.findByDoctorName(doctorName);
    }

    public List<Appointment> getAppointmentsByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }
    public Appointment patchAppointment(String id, Appointment patch) {
        Appointment existing = getAppointmentById(id);
        if (existing != null) {
            if (patch.getPatientName() != null) existing.setPatientName(patch.getPatientName());
            if (patch.getDoctorName() != null) existing.setDoctorName(patch.getDoctorName());
            if (patch.getAppointmentDate() != null) existing.setAppointmentDate(patch.getAppointmentDate());
            if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
            return appointmentRepository.save(existing);
        }
        return null;
    }
}
