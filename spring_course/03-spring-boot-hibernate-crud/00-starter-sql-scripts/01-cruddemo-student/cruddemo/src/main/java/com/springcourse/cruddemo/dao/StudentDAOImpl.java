package com.springcourse.cruddemo.dao;

import com.springcourse.cruddemo.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDAOImpl implements StudentDAO {

    // define field for entity manager
    private EntityManager entityManager;

    // Inject entity manager using constructor injection
    public StudentDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    // Implements save method
    @Override
    @Transactional
    public void save(Student student) {
        entityManager.persist(student);
    }

    @Override
    public Student findById(Integer id) {
        return entityManager.find(Student.class, id);
    }

    @Override
    public List<Student> findAll() {
        // Create query
        TypedQuery<Student> query = entityManager.createQuery(
                "FROM Student", Student.class
        );

        // return query results
        return query.getResultList();
    }

    @Override
    public List<Student> findByLastName(String lastName) {

        // Create Query
        TypedQuery<Student> query = entityManager.createQuery(
                "FROM Student WHERE lastName=:theData", Student.class
        );

        // set the query parameters
        query.setParameter("theData", lastName);

        // return query results
        return query.getResultList();
    }

    @Override
    @Transactional
    public void update(Student student) {
        entityManager.merge(student);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Student student = entityManager.find(Student.class, id);
        entityManager.remove(student);
    }

    @Override
    @Transactional
    public int deleteAll() {

        return entityManager.createQuery("DELETE FROM Student").executeUpdate();
    }
}
