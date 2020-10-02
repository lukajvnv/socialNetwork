package com.lilly021.social.model.friend;

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
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    private String text;
    private Date sendTime;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User receiver;
}
