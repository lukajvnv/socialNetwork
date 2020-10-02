package com.lilly021.social.repository;

import com.lilly021.social.model.friend.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

}
