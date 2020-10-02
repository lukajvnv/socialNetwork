package com.lilly021.social.controller;

import com.lilly021.social.dto.friend.MessageDto;
import com.lilly021.social.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/all")
    public List<MessageDto> getAll(Principal principal){
        return messageService.getAllMessageFriend(principal.getName());
    }

    @GetMapping("/all/by/{friend}")
    public List<MessageDto> getAll(Principal principal, @PathVariable String friend){
        return messageService.getMessagesWith(principal.getName(), friend);
    }

    @GetMapping("/{id}")
    public MessageDto getOne(@PathVariable Long id){
        return messageService.getOne(id);
    }

    @PostMapping
    public MessageDto newMessage(@RequestBody MessageDto message){
        return messageService.save(message);
    }

}
