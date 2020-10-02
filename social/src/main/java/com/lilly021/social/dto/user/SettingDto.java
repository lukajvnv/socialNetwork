package com.lilly021.social.dto.user;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingDto {

    private Long id;
    private String name;
    private String type;
    private List<SettingValueDto> values;
}
