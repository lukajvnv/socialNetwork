package com.lilly021.social.converters;

import com.lilly021.social.dto.post.CommentDto;
import com.lilly021.social.dto.post.PostDto;
import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.model.post.Comment;
import com.lilly021.social.model.post.Post;
import com.lilly021.social.model.user.User;
import com.lilly021.social.repository.CommentRepository;
import com.lilly021.social.repository.PostRepository;
import com.lilly021.social.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class PostConverter implements ConverterInterface<Post, PostDto> {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public PostDto convertToDto(Post object) {
        UserDto author = UserDto
                .builder()
                .id(object.getAuthor().getId())
                .firstName(object.getAuthor().getFirstName())
                .lastName(object.getAuthor().getLastName())
                .email(object.getAuthor().getUsername())
                .urlProfile(object.getAuthor().getUrlProfile())
                .build();

        PostDto postDto = PostDto
                .builder()
                .id(object.getId())
                .text(object.getText())
                .feeling(object.getFeeling())
                .style(object.getStyle())
                .postTime(object.getPostTime())
                .author(author)
                .imageUri(object.getImageUri())
                .fileUri(object.getFileUri())
                .comments(object.getComments()
                        .stream().map(c -> convertToDto(c, object.getId())).collect(Collectors.toList()))
                .build();
//
//        if(object.getComments() != null){
//            postDto.setComments(object.getComments()
//                    .stream().map(c -> convertToDto(c, object.getEntityId())).collect(Collectors.toList()));
//        }

        return postDto;
    }

    @Override
    public Post convertFromDto(PostDto object) {
        Post post = null;

        if(object.getId() == null){
            post = Post
                    .builder()
                    .text(object.getText())
                    .feeling(object.getFeeling())
                    .postTime(new Date())
                    .style(object.getStyle())
                    .comments(new HashSet<>())
                    .imageUri(object.getImageUri())
                    .fileUri(object.getFileUri())
                    .author(getUser(object.getAuthor().getEmail()))
                    .build();
        } else {
            post = postRepository.getOne(object.getId());
        }

        return post;
    }

    public CommentDto convertToDto(Comment object, Long post) {
        UserDto author = UserDto
                .builder()
                .id(object.getAuthor().getId())
                .firstName(object.getAuthor().getFirstName())
                .lastName(object.getAuthor().getLastName())
                .email(object.getAuthor().getUsername())
                .urlProfile(object.getAuthor().getUrlProfile())
                .build();

        CommentDto commentDto = CommentDto
                .builder()
                .id(object.getId())
                .text(object.getText())
                .commentTime(object.getCommentTime())
                .author(author)
                .post(post)
                .build();

        return commentDto;
    }

    private User getUser(String username){
        return userRepository.findByUsername(username);
    }
}
