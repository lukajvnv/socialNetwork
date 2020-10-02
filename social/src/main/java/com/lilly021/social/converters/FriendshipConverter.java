package com.lilly021.social.converters;

import com.lilly021.social.dto.friend.FriendshipDto;
import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.enumeration.FriendshipStatus;
import com.lilly021.social.model.friend.Friendship;
import com.lilly021.social.model.user.User;
import com.lilly021.social.repository.FriendshipRepository;
import com.lilly021.social.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class FriendshipConverter implements ConverterInterface<Friendship, FriendshipDto> {

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public FriendshipDto convertToDto(Friendship object) {
        UserDto sender = UserDto
                .builder()
                .id(object.getSender().getId())
                .firstName(object.getSender().getFirstName())
                .lastName(object.getSender().getLastName())
                .email(object.getSender().getUsername())
                .build();

        UserDto receiver = UserDto
                .builder()
                .id(object.getReceiver().getId())
                .firstName(object.getReceiver().getFirstName())
                .lastName(object.getReceiver().getLastName())
                .email(object.getReceiver().getUsername())
                .build();

        FriendshipDto friendshipDto = FriendshipDto
                .builder()
                .id(object.getId())
                .requestDate(object.getRequestDate())
                .responseDate(object.getResponseDate())
                .status(object.getStatus())
                .sender(sender)
                .receiver(receiver)
                .build();
        return friendshipDto;
    }

    @Override
    public Friendship convertFromDto(FriendshipDto object) {
        Friendship friendship = null;

        if(object.getId() == null){
            friendship = Friendship
                    .builder()
                    .requestDate(new Date())
                    .status(FriendshipStatus.PENDING)
                    .sender(getUser(object.getSender().getEmail()))
                    .receiver(getUser(object.getReceiver().getEmail()))
                    .build();
        } else {
            friendship = friendshipRepository.getOne(object.getId());
            friendship.setStatus(object.getStatus());
            friendship.setResponseDate(new Date());
        }

        return friendship;
    }

    private User getUser(String username){
        return userRepository.findByUsername(username);
    }
}
