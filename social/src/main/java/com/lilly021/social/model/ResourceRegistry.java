package com.lilly021.social.model;

import com.lilly021.social.enumeration.ResourceType;
import com.lilly021.social.model.post.Post;
import com.lilly021.social.model.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRegistry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long entityId;

    private String uri;
    private ResourceType resourceType;

    @ManyToOne
    private Post post;

}
