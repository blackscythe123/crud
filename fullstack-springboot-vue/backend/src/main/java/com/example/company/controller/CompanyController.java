package com.example.company.controller;

import com.example.company.model.Department;
import com.example.company.model.Employee;
import com.example.company.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return companyService.getAllDepartments();
    }

    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable String id) {
        return companyService.getDepartmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/departments")
    public Department createDepartment(@RequestBody Department department) {
        return companyService.createDepartment(department);
    }

    @DeleteMapping("/departments/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable String id) {
        companyService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return companyService.getAllEmployees();
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        return companyService.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employees/dept/{deptId}")
    public List<Employee> getEmployeesByDepartment(@PathVariable String deptId) {
        return companyService.getEmployeesByDepartment(deptId);
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return companyService.createEmployee(employee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String id) {
        companyService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
