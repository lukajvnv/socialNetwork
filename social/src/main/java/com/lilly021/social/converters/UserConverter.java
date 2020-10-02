package com.lilly021.social.converters;

import com.lilly021.social.dto.user.*;
import com.lilly021.social.model.user.*;
import com.lilly021.social.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserConverter implements ConverterInterface<User, UserDto>{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAttributeRepository userAttributeRepository;

    @Autowired
    private UserSettingRepository userSettingRepository;

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private SettingValueRepository settingValueRepository;

    @Override
    public UserDto convertToDto(User object) {
        UserDto userDto = UserDto
                .builder()
                .id(object.getId())
                .firstName(object.getFirstName())
                .lastName(object.getLastName())
                .gender(object.getGender())
                .birthday(object.getBirthday())
                .email(object.getUsername())
                .roles(Arrays.asList(object.getRole()))
                .activeSince(object.getActiveSince())
                .about(object.getAbout())
                .occupation(object.getOccupation())
                .address(object.getAddress())
                .urlProfile(object.getUrlProfile())
                .build();
        userDto.setUsersAttributes(
                userAttributeRepository.getUsersAttributes(object)
                        .stream().map(this::convertToDto).collect(Collectors.toList()));
        userDto.setUsersSettings(
                userSettingRepository.findByUser(object)
                        .stream().map(this::convertToDto).collect(Collectors.toList()));
        return userDto;
    }

    @Override
    public User convertFromDto(UserDto object) {
        User user = userRepository.getOne(object.getId());
        user.setFirstName(object.getFirstName());
        user.setLastName(object.getLastName());
        user.setGender(object.getGender());
        user.setBirthday(object.getBirthday());
        user.setAbout(object.getAbout());
        user.setAddress(object.getAddress());
        user.setUrlProfile(object.getUrlProfile());
        user.setOccupation(object.getOccupation());

        List<Long> uAIds = object.getUsersAttributes()
                .stream().mapToLong(UserAttributeDto::getId).boxed().collect(Collectors.toList());
        List<UserAttribute> userAttributes = userAttributeRepository.findAllById(uAIds);
        user.setUsersAttributes(userAttributes);

        List<UserSetting> userSettings = new ArrayList<>();
        for(UserSettingDto userSettingDto: object.getUsersSettings()){
            Setting setting = settingRepository.getOne(userSettingDto.getSetting().getId());
            UserSetting userSetting = UserSetting
                    .builder()
                    .setting(setting)
                    .value(userSettingDto.getValue())
                    .user(user)
                    .build();
            userSettings.add(userSetting);
        }

        user.getUsersSettings().clear();
        user.getUsersSettings().addAll(userSettings);

        return user;
    }

    public UserAttributeDto convertToDto(UserAttribute object){
        UserAttributeDto userAttributeDto = new UserAttributeDto(
                object.getId(),
                object.getType(),
                object.getValue());

        return userAttributeDto;
    }

    public SettingValueDto convertToDto(SettingValue object){
        SettingValueDto settingValueDto = new SettingValueDto(
                object.getId(),
                object.getValue());

        return settingValueDto;
    }

    public SettingDto convertToDto(Setting object){
        SettingDto settingDto = new SettingDto(
                object.getId(),
                object.getName(),
                object.getType(),
                settingValueRepository.findBySetting(object)
                        .stream().map(this::convertToDto).collect(Collectors.toList()));

        return settingDto;
    }

    public UserSettingDto convertToDto(UserSetting object){
        UserSettingDto userSettingDto = new UserSettingDto(
                object.getId(),
                convertToDto(object.getSetting()),
                object.getValue());

        return userSettingDto;
    }
}
