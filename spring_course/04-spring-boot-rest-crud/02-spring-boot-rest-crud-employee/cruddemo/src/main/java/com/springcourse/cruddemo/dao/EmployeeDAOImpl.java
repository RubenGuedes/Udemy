package com.springcourse.cruddemo.dao;

import com.springcourse.cruddemo.entity.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeDAOImpl implements EmployeeDAO {


    private EntityManager entityManager;

    @Autowired
    public EmployeeDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Employee> findAll() {
        TypedQuery<Employee> query = entityManager.createQuery("from Employee", Employee.class);

        return query.getResultList();
    }

    @Override
    public Employee findById(int id) {
        Employee employee = entityManager.find(Employee.class, id);
        return employee;
    }

    @Override
    @Transactional
    public Employee save(Employee employee) {
        Employee emp = entityManager.merge(employee);
        return emp;
    }

    @Override
    @Transactional
    public void deleteById(int id) {
        Employee employee = entityManager.find(Employee.class, id);

        entityManager.remove(employee);
    }
}
