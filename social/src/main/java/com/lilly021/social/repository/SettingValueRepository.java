package com.lilly021.social.repository;

import com.lilly021.social.model.user.Setting;
import com.lilly021.social.model.user.SettingValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettingValueRepository extends JpaRepository<SettingValue, Long> {

    List<SettingValue> findBySetting(Setting setting);
}
