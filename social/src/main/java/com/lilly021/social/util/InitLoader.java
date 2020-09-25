package com.lilly021.social.util;

import com.lilly021.social.dto.friend.FriendshipDto;
import com.lilly021.social.dto.friend.MessageDto;
import com.lilly021.social.dto.post.CommentDto;
import com.lilly021.social.dto.post.PostDto;
import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.dto.user.UserSettingDto;
import com.lilly021.social.enumeration.FriendshipStatus;
import com.lilly021.social.service.FriendshipService;
import com.lilly021.social.service.MessageService;
import com.lilly021.social.service.PostService;
import com.lilly021.social.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class InitLoader implements ApplicationRunner {

    @Autowired
    private PasswordEncoder userPasswordEncoder;

    @Autowired
    private MessageService messageService;

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        messageTest();
//        friendshipTest();
//        postTest();
        userTest();
    }


    private void messageTest(){
        List<String> passwords = Arrays.asList(new String[]{"admin1234", "user1", "user2", "user3"});
        for(String pass: passwords){
            System.out.println(userPasswordEncoder.encode(pass));
        }

        List<MessageDto> msg = messageService.getMessagesWith("user1@gmail.com", "user2@gmail.com");
        List<MessageDto> msgs = messageService.getAllMessageFriend("user2@gmail.com");

        UserDto sender = UserDto
                .builder()
                .email("user1@gmail.com")
                .build();

        UserDto receiver = UserDto
                .builder()
                .email("user3@gmail.com")
                .build();

        MessageDto messageDto = MessageDto
                .builder()
                .text("Proba da li radi ovo")
                .sendTime(new Date())
                .sender(sender)
                .receiver(receiver)
                .build();

        messageService.save(messageDto);
    }

    private void friendshipTest(){
//        List<FriendshipDto> friendshipDtos = friendshipService.getAll();
//        FriendshipDto friendshipDto = friendshipService.getOne(1l);
//        List<FriendshipDto> friendshipDtos = friendshipService.getFriends("user3@gmail.com");

        UserDto sender = UserDto
                .builder()
                .email("admin@gmail.com")
                .build();

        UserDto receiver = UserDto
                .builder()
                .email("user3@gmail.com")
                .build();

        FriendshipDto friendshipDto = FriendshipDto
                .builder()
//                .entityId(object.getEntityId())
                .requestDate(new Date())
                .responseDate(null)
                .status(FriendshipStatus.PENDING)
                .sender(sender)
                .receiver(receiver)
                .build();

//        friendshipService.save(friendshipDto);

        List<String> friendList = friendshipService.getAcceptedFriendsList("user1@gmail.com");

    }

    private void postTest(){
        List<String> friendList = friendshipService.getAcceptedFriendsList("user1@gmail.com");
        List<PostDto> friendsPosts = postService.getFriendsPosts("user1@gmail.com", friendList);

        List<PostDto> postDtos = postService.getAll();

        // new post
        PostDto post = PostDto
                .builder()
                .text("new post init laoder")
                .feeling("phenomenal")
                .postTime(new Date())
                .style("blue")
                .comments(new ArrayList<>())
                .author(UserDto.builder().email("user2@gmail.com").build())
                .build();

        PostDto postDto = postService.save(post);

        List<PostDto> userPostsBefore = postService.getUserPosts("user2@gmail.com");

        // new comment
        CommentDto commentDto = CommentDto
                .builder()
                .text("New comment by user3 post3")
                .commentTime(new Date())
                .author(UserDto.builder().email("user3@gmail.com").build())
                .post(3l)
                .build();

        CommentDto commentDto1 = postService.save(commentDto);

        List<PostDto> userPostsAfter = postService.getUserPosts("user2@gmail.com");

    }

    private void userTest(){
//        List<UserDto> userDtos = userService.getAll();
//        List<UserSettingDto> s = userService.getUserSetting("user1@gmail.com");
        UserDto userDto = UserDto
                .builder()
                .id(3l)
                .firstName("Milan")
                .lastName("Markovic")
                .gender("other")
                .birthday(new Date(828054000000l))
                .about("cool guy")
                .occupation("dancer")
                .address("Masarikova")
                .urlProfile("url")
//                .usersAttributes(object.getUsersAttributes().stream().map(this::convertToDto).collect(Collectors.toList()))
                .build();

//        UserDto saved = userService.save(userDto);
    }
}
