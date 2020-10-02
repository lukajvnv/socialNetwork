package com.lilly021.social.repository;

import com.lilly021.social.model.user.Setting;
import com.lilly021.social.model.user.User;
import com.lilly021.social.model.user.UserAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserAttributeRepository extends JpaRepository<UserAttribute, Long> {

    @Query("SELECT uA FROM UserAttribute uA INNER JOIN FETCH uA.users u where u = ?1")
    List<UserAttribute> getUsersAttributes(User user);
}
