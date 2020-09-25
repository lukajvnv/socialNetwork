package com.lilly021.social.repository;

import com.lilly021.social.model.user.Setting;
import com.lilly021.social.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SettingRepository extends JpaRepository<Setting, Long> {

}
