package com.example.coursereg.controller;

import com.example.coursereg.model.Course;
import com.example.coursereg.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id);
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
    }

    @PostMapping("/{id}/register")
    public Course registerStudent(@PathVariable String id, @RequestParam String studentName) {
        return courseService.registerStudent(id, studentName);
    }
}
