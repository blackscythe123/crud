package com.example.company.service;

import com.example.company.model.Department;
import com.example.company.model.Employee;
import com.example.company.repository.DepartmentRepository;
import com.example.company.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public CompanyService(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(String id) {
        return departmentRepository.findById(id);
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Optional<Department> patchDepartment(String id, Department patch) {
        return departmentRepository.findById(id).map(existing -> {
            if (patch.getName() != null) {
                existing.setName(patch.getName());
            }
            if (patch.getCode() != null) {
                existing.setCode(patch.getCode());
            }
            return departmentRepository.save(existing);
        });
    }

    public void deleteDepartment(String id) {
        departmentRepository.deleteById(id);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepository.findById(id);
    }

    public List<Employee> getEmployeesByDepartment(String departmentId) {
        return employeeRepository.findByDepartmentId(departmentId);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Optional<Employee> patchEmployee(String id, Employee patch) {
        return employeeRepository.findById(id).map(existing -> {
            if (patch.getName() != null) {
                existing.setName(patch.getName());
            }
            if (patch.getEmail() != null) {
                existing.setEmail(patch.getEmail());
            }
            if (patch.getDepartmentId() != null) {
                existing.setDepartmentId(patch.getDepartmentId());
            }
            if (patch.getSalary() != null) {
                existing.setSalary(patch.getSalary());
            }
            return employeeRepository.save(existing);
        });
    }

    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }
}
