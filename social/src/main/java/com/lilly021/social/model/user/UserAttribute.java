package com.lilly021.social.model.user;

import com.lilly021.social.enumeration.UserAttributeType;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private UserAttributeType type;

    @Column
    private String value;

    @ManyToMany(mappedBy = "usersAttributes")
    private List<User> users;
}
