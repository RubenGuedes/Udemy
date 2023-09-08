package com.course.springboot.demo.mycoolapp.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FunRestController {


    @Value("${coach.name}")
    private String coachName;

    @Value("${team.name}")
    private String teamName;

    // Expose "/" that return "Hello World"
    @GetMapping("/")
    public String sayHello() {
        return "<h1><i>Hello World!</i></h1>";
    }

    @GetMapping("/workout")
    public String getDailyWorkout() {
        return "Run a hard 5k!";
    }

    @GetMapping("/fortune")
    public String getDailyFortune() {
        return "Today is your lucky day!";
    }

    // Expose new endpoint for team info
    @GetMapping("/team_info")
    public String getTeamInfo() {
        return "Coach: " + coachName + ", Team Name: " + teamName;
    }
}
