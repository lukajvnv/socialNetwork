package com.lilly021.social.model.post;

import com.lilly021.social.model.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    private String text;
    private Date commentTime;

    @ManyToOne
    private User author;

    @ManyToOne
    private Post post;
}
