package com.lilly021.social.model.post;

import com.lilly021.social.model.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    private String text;
    private String feeling;
    private Date postTime;
    private String style;
    private String imageUri;
    private String fileUri;

    @OneToMany(mappedBy = "post", fetch = FetchType.EAGER)
    private Set<Comment> comments;

    @ManyToOne
    private User author;
}
