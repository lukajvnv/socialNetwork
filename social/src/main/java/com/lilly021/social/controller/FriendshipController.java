package com.lilly021.social.controller;

import com.lilly021.social.dto.friend.FriendshipDto;
import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/friendship")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @GetMapping("/active")
    public List<FriendshipDto> getAll(Principal principal, @RequestParam(value = "user", required = false, defaultValue="") String user){
        String userQuery = user.isEmpty() ? principal.getName() : user;
        return friendshipService.getAcceptedFriends(userQuery);
    }

    @GetMapping("/all")
    public List<FriendshipDto> getAllActive(Principal principal){
        return friendshipService.getAllFriends(principal.getName());
    }

    @GetMapping("/suggestions")
    public List<UserDto> getSuggestions(Principal principal){
        return friendshipService.getSuggestions(principal.getName());
    }

    @GetMapping("/{id}")
    public FriendshipDto getOne(@PathVariable Long id){
        return friendshipService.getOne(id);
    }

    @PostMapping
    public FriendshipDto post(@RequestBody FriendshipDto friendshipDto){
        return friendshipService.save(friendshipDto);
    }


}
