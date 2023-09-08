package com.myapp.springcoredemo.common;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

// Implements the coach interface
@Component
// @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class CricketCoach implements Coach {

    public CricketCoach() {
        System.out.println("Constructor: " + getClass().getSimpleName());
    }

    /*
    // define our init method
    @PostConstruct
    public void doMyStartupStuff() {
        System.out.println("In doMyStartupStuff(): " + getClass().getSimpleName());
    }

    // define our destroy method
    @PreDestroy
    public void doMyCleanStuff() {
        System.out.println("In doMyCleanStuff(): " + getClass().getSimpleName());
    }
    */

    @Override
    public String getDailyWorkout() {
        return "Practice fast bowling for 15 minutes!! :D";
    }


}
