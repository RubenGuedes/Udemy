package com.springcourse.demo.rest;

import com.springcourse.demo.entity.Student;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api")
public class StudentRestController {

    private List<Student> studentList;

    @PostConstruct
    public void loadData() {
        this.studentList = new ArrayList<>();

        this.studentList.add(new Student("Ruben", "Peixoto"));
        this.studentList.add(new Student("Sara", "Brandão"));
        this.studentList.add(new Student("Guilherme", "Brandão"));
    }

    @GetMapping("/students")
    public List<Student> getStudents() {

        return this.studentList;
    }

    @GetMapping("/students/{studentId}")
    public Student getStudent(@PathVariable int studentId) {


        // check the studentID again list size
        if (studentId >= this.studentList.size() || (studentId < 0)) {
            throw new StudentNotFoundException("Student ID not found - " + studentId);
        }

        return this.studentList.get(studentId);
    }
}
