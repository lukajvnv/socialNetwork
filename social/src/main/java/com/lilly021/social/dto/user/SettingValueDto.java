package com.lilly021.social.dto.user;

import com.lilly021.social.model.user.Setting;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingValueDto {

    private Long id;
    private String value;
}
