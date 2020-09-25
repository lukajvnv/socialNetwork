package com.lilly021.social.controller;

import com.lilly021.social.dto.post.CommentDto;
import com.lilly021.social.dto.post.PostDto;
import com.lilly021.social.service.FriendshipService;
import com.lilly021.social.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private FriendshipService friendshipService;

    @GetMapping("/all")
    public List<PostDto> getAll(Principal principal){
        String user = principal.getName();
        List<String> friendshipDtos = friendshipService.getAcceptedFriendsList(user);
        friendshipDtos.add(user);
        return postService.getFriendsPosts(user, friendshipDtos);
    }

    @GetMapping("/user")
    public List<PostDto> getAll(Principal principal, @RequestParam(value = "user", required = false, defaultValue="") String user){
        String userQuery = user.isEmpty() ? principal.getName() : user;
        return postService.getUserPosts(userQuery);
    }

    @GetMapping("/{id}")
    public PostDto getOne(@PathVariable Long id){
        return postService.getOne(id);
    }

    @PostMapping
    public PostDto post(@RequestBody PostDto postDto){
        return postService.save(postDto);
    }

    @PostMapping("/comment")
    public CommentDto post(@RequestBody CommentDto commentDto){
        return postService.save(commentDto);
    }
}
