package com.lilly021.social.dto.user;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Date birthday;
    private String gender;
    private List<String> roles;
    private Date activeSince;
    private String about;
    private String occupation;
    private String address;
    private String urlProfile;
    private List<UserAttributeDto> usersAttributes;
    private List<UserSettingDto> usersSettings;

}
