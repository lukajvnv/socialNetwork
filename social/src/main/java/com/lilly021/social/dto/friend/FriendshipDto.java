package com.lilly021.social.dto.friend;

import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.enumeration.FriendshipStatus;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendshipDto {

    private Long id;
    private Date requestDate;
    private Date responseDate;
    private FriendshipStatus status;
    private UserDto sender;
    private UserDto receiver;

}
