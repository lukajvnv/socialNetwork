package com.lilly021.social.dto.user;

import com.lilly021.social.enumeration.UserAttributeType;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAttributeDto {

    private Long id;
    private UserAttributeType type;
    private String value;

}
