package com.lilly021.social.dto.post;

import com.lilly021.social.dto.user.UserDto;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {

    private Long id;
    private String text;
    private String feeling;
    private Date postTime;
    private String style;
    private List<CommentDto> comments;
    private UserDto author;
    private String imageUri;
    private String fileUri;
}
