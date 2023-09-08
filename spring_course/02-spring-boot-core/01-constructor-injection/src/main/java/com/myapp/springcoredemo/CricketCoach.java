package com.myapp.springcoredemo;

import org.springframework.stereotype.Component;

// Implements the coach interface
@Component
public class CricketCoach implements Coach{

    @Override
    public String getDailyWorkout() {
        return "Practice fast bowling for 15 minutes!!";
    }


}
