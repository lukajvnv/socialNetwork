package com.lilly021.social.service;

import com.lilly021.social.converters.FriendshipConverter;
import com.lilly021.social.converters.UserConverter;
import com.lilly021.social.dto.friend.FriendshipDto;
import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.enumeration.FriendshipStatus;
import com.lilly021.social.model.friend.Friendship;
import com.lilly021.social.model.user.User;
import com.lilly021.social.repository.FriendshipRepository;
import com.lilly021.social.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FriendshipService implements ServiceInterface<Friendship, FriendshipDto, Long>{

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private FriendshipConverter friendshipConverter;

    @Override
    public List<FriendshipDto> getAll() {
        List<Friendship> friendships = friendshipRepository.findAll();
        return friendships.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public FriendshipDto save(FriendshipDto object) {
        return convertToDto(friendshipRepository.save(convertFromDto(object)));
    }

    @Override
    public FriendshipDto getOne(Long id) {
        return convertToDto(friendshipRepository.getOne(id));
    }

    @Override
    public void delete(Long id) {
        friendshipRepository.deleteById(id);
    }

    @Override
    public FriendshipDto convertToDto(Friendship object) {
        return friendshipConverter.convertToDto(object);
    }

    @Override
    public Friendship convertFromDto(FriendshipDto object) {
        return friendshipConverter.convertFromDto(object);
    }

    private User getUser(String username){
        return userRepository.findByUsername(username);
    }

    public List<FriendshipDto> getAcceptedFriends(String user){
        List<FriendshipDto> friendshipDtos =  getAll()
                .stream()
                .filter(friendshipDto ->
                        friendshipDto.getSender().getEmail().equals(user)
                                || friendshipDto.getReceiver().getEmail().equals(user)
                )
                .filter(f -> f.getStatus().equals(FriendshipStatus.ACCEPTED))
                .collect(Collectors.toList());

        return friendshipDtos;
    }

    public List<FriendshipDto> getAllFriends(String user){
        List<FriendshipDto> friendshipDtos =  getAll()
                .stream()
                .filter(friendshipDto ->
                        friendshipDto.getSender().getEmail().equals(user)
                                || friendshipDto.getReceiver().getEmail().equals(user)
                )
                .collect(Collectors.toList());

        return friendshipDtos;
    }

    public List<UserDto> getSuggestions(String username){
        User user = getUser(username);
        List<String> friendList = getAllFriendsList(username);
        friendList.add(user.getUsername());
        List<User> users = userRepository.findByRole("ROLE_USER");

        List<UserDto> suggestions =  new ArrayList<>();
        for(User u: users){
            if(!friendList.contains(u.getUsername())){
                suggestions.add(userConverter.convertToDto(u));
            }
        }

        return suggestions;
    }

    public List<String> getAcceptedFriendsList(String user){

        List<String> friendList =  getAcceptedFriends(user)
                .stream()
                .map(f -> mapFromUserDtoToString(f, user))
                .collect(Collectors.toList());

        return friendList;
    }

    public List<String> getAllFriendsList(String user){

        List<String> friendList =  getAllFriends(user)
                .stream()
                .map(f -> mapFromUserDtoToString(f, user))
                .collect(Collectors.toList());

        return friendList;
    }

    private String mapFromUserDtoToString(FriendshipDto friendshipDto, String user){
        if(!friendshipDto.getSender().getEmail().equals(user)){
            return friendshipDto.getSender().getEmail();
        } else {
            return friendshipDto.getReceiver().getEmail();
        }
    }
}
