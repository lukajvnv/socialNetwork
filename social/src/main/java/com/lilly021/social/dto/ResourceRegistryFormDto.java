package com.lilly021.social.dto;

import com.lilly021.social.dto.post.PostDto;
import com.lilly021.social.enumeration.ResourceType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRegistryFormDto {

    private Long id;
    private Long post;
    private ResourceType resourceType;
    private MultipartFile file;
}
