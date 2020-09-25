package com.lilly021.social;

import com.lilly021.social.dto.SignUpForm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/hello")
    public String sayHello(@RequestParam(value ="myName", defaultValue = "Luka") String name){
        return String.format("Hello %s!", name);
    }

    @PostMapping("/hello")
    public String sayHelloPost(@RequestBody SignUpForm signUpForm){
        SignUpForm s = SignUpForm.builder().build();
        System.out.println(signUpForm);
        return "Success";
    }

}


