package com.lilly021.social.service;

import com.lilly021.social.converters.MessageConverter;
import com.lilly021.social.dto.friend.MessageDto;
import com.lilly021.social.model.friend.Message;
import com.lilly021.social.model.user.User;
import com.lilly021.social.repository.MessageRepository;
import com.lilly021.social.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageService implements ServiceInterface<Message, MessageDto, Long>{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageConverter messageConverter;

    @Override
    public List<MessageDto> getAll() {
        List<Message> messages = messageRepository.findAll();
        return messages.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public MessageDto save(MessageDto object) {
        return convertToDto(messageRepository.save(convertFromDto(object)));
    }

    @Override
    public MessageDto getOne(Long id) {
        return convertToDto(messageRepository.getOne(id));
    }

    @Override
    public void delete(Long id) {
        messageRepository.deleteById(id);
    }

    public List<MessageDto> getMessagesWith(String loggedUsername, String friendsUsername){
        User loggedUser = getUser(loggedUsername);
        User friend = getUser(friendsUsername);

        return getAll()
                .stream()
                .filter(messageDto ->
                        (messageDto.getSender().getEmail().equals(loggedUsername) && messageDto.getReceiver().getEmail().equals(friendsUsername))
                        || (messageDto.getSender().getEmail().equals(friendsUsername) && messageDto.getReceiver().getEmail().equals(loggedUsername))
                )
                .collect(Collectors.toList());
    }

    public List<MessageDto> getAllMessageFriend(String loggedUsername){
        User loggedUser = getUser(loggedUsername);

        List<MessageDto> messageFriend =  getAll()
                .stream()
                .filter(messageDto ->
                        messageDto.getSender().getEmail().equals(loggedUsername)
                                || messageDto.getReceiver().getEmail().equals(loggedUsername)
                )
                .collect(Collectors.toList());

        Collections.sort(messageFriend, new Comparator<MessageDto>() {
            @Override
            public int compare(MessageDto o1, MessageDto o2) {
                return o2.getSendTime().compareTo(o1.getSendTime());
            }
        });

        List<String> friendList = new ArrayList<String>();
        List<MessageDto> latestMessageFriend = new ArrayList<MessageDto>();
        for(MessageDto msg: messageFriend){
            String friendToTest = !loggedUsername.equals(msg.getSender().getEmail()) ? msg.getSender().getEmail() : msg.getReceiver().getEmail();
            if(!friendList.contains(friendToTest)){
                friendList.add(friendToTest);
                latestMessageFriend.add(msg);
            }
        }

        return latestMessageFriend;
    }

    @Override
    public MessageDto convertToDto(Message object) {
        return messageConverter.convertToDto(object);
    }

    @Override
    public Message convertFromDto(MessageDto object) {
       return messageConverter.convertFromDto(object);
    }

    private User getUser(String username){
        return userRepository.findByUsername(username);
    }
}
