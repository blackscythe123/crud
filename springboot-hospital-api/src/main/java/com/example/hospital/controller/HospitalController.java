package com.example.hospital.controller;

import com.example.hospital.model.Appointment;
import com.example.hospital.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping
    public List<Appointment> getAllAppointments(
            @RequestParam(required = false) String doctorName,
            @RequestParam(required = false) String status) {
        if (doctorName != null && !doctorName.trim().isEmpty()) {
            return hospitalService.getAppointmentsByDoctorName(doctorName);
        }
        if (status != null && !status.trim().isEmpty()) {
            return hospitalService.getAppointmentsByStatus(status);
        }
        return hospitalService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable String id) {
        return hospitalService.getAppointmentById(id);
    }

    @PostMapping
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return hospitalService.bookAppointment(appointment);
    }

    @PutMapping("/{id}/status")
    public Appointment updateStatus(@PathVariable String id, @RequestParam String status) {
        return hospitalService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void cancelAppointment(@PathVariable String id) {
        hospitalService.cancelAppointment(id);
    }
}
