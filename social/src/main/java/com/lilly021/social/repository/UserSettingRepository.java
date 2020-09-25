package com.lilly021.social.repository;

import com.lilly021.social.model.user.Setting;
import com.lilly021.social.model.user.User;
import com.lilly021.social.model.user.UserSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {

    List<UserSetting> findByUser(User user);
}
