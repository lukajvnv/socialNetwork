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
public class PageblePostDto {

    private List<PostDto> posts;
    private int pages;
}
