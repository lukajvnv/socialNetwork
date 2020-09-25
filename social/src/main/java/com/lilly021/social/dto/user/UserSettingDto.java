package com.lilly021.social.dto.user;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSettingDto {

    private Long id;
    private SettingDto setting;
    private String value;
}
