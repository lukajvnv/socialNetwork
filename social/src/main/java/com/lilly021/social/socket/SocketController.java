package com.lilly021.social.socket;

import com.lilly021.social.dto.friend.MessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class SocketController {

    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public MessageBean send(@Payload MessageBean message) {
        return message;
    }

    @MessageMapping("/message")
    @SendTo("/topic/user")
    public MessageDto send(@RequestBody MessageDto message) {
        return message;
    }
}
