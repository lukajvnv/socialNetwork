package com.lilly021.social.dto;

import lombok.*;

import javax.persistence.Column;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpForm {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date birthday;
    private String gender;
}
