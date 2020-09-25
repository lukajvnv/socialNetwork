package com.lilly021.social.dto.friend;

import com.lilly021.social.dto.user.UserDto;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private Long id;
    private String text;
    private Date sendTime;
    private UserDto sender;
    private UserDto receiver;
}
