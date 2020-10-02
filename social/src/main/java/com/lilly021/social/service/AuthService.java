package com.lilly021.social.service;

import com.lilly021.social.dto.SignUpForm;
import com.lilly021.social.model.user.User;
import com.lilly021.social.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder userPasswordEncoder;

    public User signUp(SignUpForm object) {
        User user = User
                .builder()
                .firstName(object.getFirstName())
                .lastName(object.getLastName())
                .gender(object.getGender())
                .birthday(object.getBirthday())
                .username(object.getEmail())
                .password(userPasswordEncoder.encode(object.getPassword()))
                .enabled(true)
                .role("ROLE_USER")
                .activeSince(new Date())
                .build();
        return userRepository.save(user);
    }
}
