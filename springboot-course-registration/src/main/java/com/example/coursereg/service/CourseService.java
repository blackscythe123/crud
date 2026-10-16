package com.example.coursereg.service;

import com.example.coursereg.model.Course;
import com.example.coursereg.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id).orElse(null);
    }

    public Course createCourse(Course course) {
        if (course.getId() != null && course.getId().trim().isEmpty()) {
            course.setId(null);
        }
        if (course.getEnrolledStudents() == null) {
            course.setEnrolledStudents(new ArrayList<>());
        }
        return courseRepository.save(course);
    }

    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }

    public Course registerStudent(String courseId, String studentName) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course != null) {
            if (course.getEnrolledStudents() == null) {
                course.setEnrolledStudents(new ArrayList<>());
            }
            if (course.getEnrolledStudents().size() < course.getCapacity()) {
                course.getEnrolledStudents().add(studentName);
                return courseRepository.save(course);
            }
        }
        return null;
    }

    public Course getCourseByCourseCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode).orElse(null);
    }

    public List<Course> getCoursesByDepartment(String department) {
        return courseRepository.findByDepartment(department);
    }
    public Course patchCourse(String id, Course patch) {
        Course existing = getCourseById(id);
        if (existing != null) {
            if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
            if (patch.getInstructor() != null) existing.setInstructor(patch.getInstructor());
            if (patch.getCapacity() > 0) existing.setCapacity(patch.getCapacity());
            return courseRepository.save(existing);
        }
        return null;
    }
}
