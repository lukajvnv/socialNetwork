package com.lilly021.social.controller;

import com.lilly021.social.dto.SignUpForm;
import com.lilly021.social.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signUp")
    public String signUp(@RequestBody SignUpForm signUpForm){
        authService.signUp(signUpForm);
        return "Success";
    }
}
