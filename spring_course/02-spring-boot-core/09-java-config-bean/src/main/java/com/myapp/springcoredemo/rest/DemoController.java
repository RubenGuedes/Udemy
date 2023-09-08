package com.myapp.springcoredemo.rest;

import com.myapp.springcoredemo.common.Coach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    private Coach coach;

    /*  Construction Injection*/
    @Autowired
    public DemoController(@Qualifier("aquatic") Coach coach)
    {
        System.out.println("Constructor: " + getClass().getSimpleName());
        this.coach = coach;
    }

    /* Setter Injection
    @Autowired
    public void setCoach(Coach coach) {
        this.coach = coach;
    }
    */

    @GetMapping("/dailyworkout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }
}
