package com.example.coursereg.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "courses")
public class Course {

    @Id
    private String id;
    private String courseCode;
    private String title;
    private int credits;
    private String department;
    private int capacity;
    private List<String> enrolledStudents;

    public Course() {
        this.enrolledStudents = new ArrayList<>();
    }

    public Course(String courseCode, String title, int credits, String department, int capacity) {
        this.courseCode = courseCode;
        this.title = title;
        this.credits = credits;
        this.department = department;
        this.capacity = capacity;
        this.enrolledStudents = new ArrayList<>();
    }

    public Course(String id, String courseCode, String title, int credits, String department, int capacity, List<String> enrolledStudents) {
        this.id = id;
        this.courseCode = courseCode;
        this.title = title;
        this.credits = credits;
        this.department = department;
        this.capacity = capacity;
        this.enrolledStudents = enrolledStudents != null ? enrolledStudents : new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<String> getEnrolledStudents() {
        return enrolledStudents;
    }

    public void setEnrolledStudents(List<String> enrolledStudents) {
        this.enrolledStudents = enrolledStudents;
    }
}
