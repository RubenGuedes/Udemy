package com.springcourse.cruddemo;

import com.springcourse.cruddemo.dao.StudentDAO;
import com.springcourse.cruddemo.entity.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class CruddemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CruddemoApplication.class, args);
    }


    @Bean
    public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
        return runner -> {
            // createStudent(studentDAO);

            createMultipleStudents(studentDAO);

            // readStudent(studentDAO);

            // queryForStudents(studentDAO);

            // queryForStudentsByLastName(studentDAO);

            // updateStudent(studentDAO);

            // deleteStudent(studentDAO);

            // deleteAllStudents(studentDAO);
        };
    }

    private void deleteAllStudents(StudentDAO studentDAO) {
        System.out.println("deleting all students");
        int numRowsDeleted = studentDAO.deleteAll();
        System.out.println("Removed " + numRowsDeleted + " items.");
    }

    private void deleteStudent(StudentDAO studentDAO) {
        int studentId = 4;
        System.out.println("Deleting student id: " + studentId);
        studentDAO.delete(studentId);
    }

    private void updateStudent(StudentDAO studentDAO) {

        // retrieve student based on the id: primary key
        int studentID = 1;
        System.out.println("Getting student with id: " + studentID);
        Student student = studentDAO.findById(studentID);

        // change first Name ro "Guilherme"
        student.setFirstName("Guilherme");

        // update the student
        studentDAO.update(student);

        // display the updated student
        System.out.println(student);
    }

    private void queryForStudentsByLastName(StudentDAO studentDAO) {

        // get a list of students
        List<Student> theStudents = studentDAO.findByLastName("Guedes");

        // display list of students
        for (Student student : theStudents) {
            System.out.println(student);
        }
    }

    private void queryForStudents(StudentDAO studentDAO) {

        // get a list of students
        List<Student> studentsList = studentDAO.findAll();

        // display list of students
        for (Student student : studentsList) {
            System.out.println(student);
        }


    }

    private void readStudent(StudentDAO studentDAO) {

        // create a student object
        System.out.println("Creating new student object ...");
        Student student = new Student(
                "Daffy",
                "Duck",
                "test@test.com"
        );

        // save the student
        studentDAO.save(student);

        // display id of the saved student
        final int ID = student.getId();
        System.out.println("Id of saved student: " + ID);

        // retrieve student based  in the id: primary key
        Student foundStudent = studentDAO.findById(ID);

        // display student
        System.out.println("Student name: " + foundStudent);
    }

    private void createMultipleStudents(StudentDAO studentDAO) {

        // create multiple students
        System.out.println("Creating new student object ...");
        Student student1 = new Student("Ruben", "Guedes", "test");
        Student student2 = new Student("Sara", "Brandão", "test");
        Student student3 = new Student("Bonita", "Applebus", "test");

        // save the student objects
        System.out.println("Saving the student ...");
        studentDAO.save(student1);
        studentDAO.save(student2);
        studentDAO.save(student3);

    }

    private void createStudent(StudentDAO studentDAO) {

        // create the student object
        System.out.println("Creating new student object ...");
        Student student = new Student("Ruben", "Guedes", "test");

        // save the student object
        System.out.println("Saving the student ...");
        studentDAO.save(student);

        // display id of saved student
        System.out.println("Saved student. Generated id: " + student.getId());
    }
}
