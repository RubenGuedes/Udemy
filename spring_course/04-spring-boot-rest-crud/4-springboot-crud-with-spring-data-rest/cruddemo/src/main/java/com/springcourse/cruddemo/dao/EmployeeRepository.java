package com.springcourse.cruddemo.dao;

import com.springcourse.cruddemo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "members") // change "/employees" to "/members" (no typo)
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
