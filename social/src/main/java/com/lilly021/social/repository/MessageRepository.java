package com.lilly021.social.repository;

import com.lilly021.social.model.friend.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
