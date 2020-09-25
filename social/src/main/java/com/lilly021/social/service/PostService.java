package com.lilly021.social.service;

import com.lilly021.social.converters.PostConverter;
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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService implements ServiceInterface<Post, PostDto, Long> {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostConverter postConverter;

    @Override
    public List<PostDto> getAll() {
        List<Post> posts = postRepository.findAllByOrderByIdDesc();
        return posts.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public PostDto save(PostDto object) {
        return convertToDto(postRepository.save(convertFromDto(object)));
    }

    @Override
    public PostDto getOne(Long id) {
        return convertToDto(postRepository.getOne(id));
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public PostDto convertToDto(Post object) {
        return postConverter.convertToDto(object);
    }

    @Override
    public Post convertFromDto(PostDto object) {
        return postConverter.convertFromDto(object);
    }

    private User getUser(String username){
        return userRepository.findByUsername(username);
    }

    public List<PostDto> getUserPosts(String user){
        List<PostDto> userPosts = getAll()
                .stream()
                .filter(postDto -> postDto.getAuthor().getEmail().equals(user))
                .collect(Collectors.toList());
        return userPosts;
    }

    public List<PostDto> getFriendsPosts(String user, List<String> friends){
        List<PostDto> allPosts = getAll();
        List<PostDto> postDtos = new ArrayList<>();

        for(PostDto dto: allPosts){
            if(friends.contains(dto.getAuthor().getEmail())){
                postDtos.add(dto);
            }
        }
        return postDtos;
    }

    public CommentDto convertToDto(Comment object, Long post) {
        UserDto author = UserDto
                .builder()
                .id(object.getAuthor().getId())
                .firstName(object.getAuthor().getFirstName())
                .lastName(object.getAuthor().getLastName())
                .email(object.getAuthor().getUsername())
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

    public Comment convertFromDto(CommentDto object) {
        Post post = postRepository.getOne(object.getPost());

        Comment commentDto = Comment
                .builder()
                .id(object.getId())
                .text(object.getText())
                .commentTime(new Date())
                .author(getUser(object.getAuthor().getEmail()))
                .post(post)
                .build();

        return commentDto;
    }

    public CommentDto save(CommentDto object) {
        return convertToDto(commentRepository.save(convertFromDto(object)), object.getPost());
    }

}
