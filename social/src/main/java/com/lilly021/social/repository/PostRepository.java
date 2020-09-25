package com.lilly021.social.repository;

import com.lilly021.social.model.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    public List<Post> findAllByOrderByIdDesc();
}
