package com.lilly021.social.repository;

import com.lilly021.social.model.post.PostReaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostReactionRepository extends JpaRepository<PostReaction, Long> {

}
