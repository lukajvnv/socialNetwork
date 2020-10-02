package com.lilly021.social.converters;

import com.lilly021.social.dto.friend.MessageDto;
import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.model.friend.Message;
import com.lilly021.social.model.user.User;
import com.lilly021.social.repository.MessageRepository;
import com.lilly021.social.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MessageConverter implements ConverterInterface<Message, MessageDto> {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public MessageDto convertToDto(Message object) {
        UserDto sender = UserDto
                .builder()
                .id(object.getSender().getId())
                .firstName(object.getSender().getFirstName())
                .lastName(object.getSender().getLastName())
                .email(object.getSender().getUsername())
                .urlProfile(object.getSender().getUrlProfile())
                .build();

        UserDto receiver = UserDto
                .builder()
                .id(object.getReceiver().getId())
                .firstName(object.getReceiver().getFirstName())
                .lastName(object.getReceiver().getLastName())
                .email(object.getReceiver().getUsername())
                .urlProfile(object.getReceiver().getUrlProfile())
                .build();

        MessageDto messageDto = MessageDto
                .builder()
                .id(object.getId())
                .text(object.getText())
                .sendTime(object.getSendTime())
                .sender(sender)
                .receiver(receiver)
                .build();
        return messageDto;
    }

    @Override
    public Message convertFromDto(MessageDto object) {
        Message message = Message
                .builder()
                .sendTime(new Date())
                .text(object.getText())
                .sender(getUser(object.getSender().getEmail()))
                .receiver(getUser(object.getReceiver().getEmail()))
                .build();

        return message;
    }

    private User getUser(String username){
        return userRepository.findByUsername(username);
    }
}
