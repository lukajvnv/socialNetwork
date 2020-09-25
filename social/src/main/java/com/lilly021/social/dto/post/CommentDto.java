package com.lilly021.social.dto.post;

import com.lilly021.social.dto.user.UserDto;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private Long id;
    private String text;
    private Date commentTime;
    private UserDto author;
    private Long post;
}
