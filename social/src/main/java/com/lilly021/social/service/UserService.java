package com.lilly021.social.service;

import com.lilly021.social.converters.UserConverter;
import com.lilly021.social.dto.user.*;
import com.lilly021.social.model.user.*;
import com.lilly021.social.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements ServiceInterface<User, UserDto, Long> {

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

    @Autowired
    private UserConverter userConverter;

    @Override
    public List<UserDto> getAll() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public UserDto save(UserDto object) {
        return convertToDto(userRepository.save(convertFromDto(object)));
    }

    @Override
    public UserDto getOne(Long id) {
        return convertToDto(userRepository.getOne(id));
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDto convertToDto(User object) {
        return userConverter.convertToDto(object);
    }

    @Override
    public User convertFromDto(UserDto object) {
        return userConverter.convertFromDto(object);
    }

    public UserDto getUser(String username) {
        return convertToDto(userRepository.findByUsername(username));
    }

    public UserAttributeDto convertToDto(UserAttribute object){
        UserAttributeDto userAttributeDto = new UserAttributeDto(object.getId(), object.getType(), object.getValue());
        return userAttributeDto;
    }

    public List<UserSettingDto> getUserSetting(String username){
        User user = userRepository.findByUsername(username);

        return userSettingRepository
                .findByUser(user)
                .stream()
                .map(uS -> userConverter.convertToDto(uS))
                .collect(Collectors.toList());
    }

    public List<UserSettingDto> updateUserSetting(String username, UserDto userDto){
        User user = userRepository.findByUsername(username);

        List<UserSetting> userSettings = new ArrayList<>();
        for(UserSettingDto userSettingDto: userDto.getUsersSettings()){
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
        userRepository.save(user);

        return getUserSetting(username);
    }

    public List<UserAttributeDto> getUserAttributeDataSource(){
        return userAttributeRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<SettingDto> getUserSettingDataSource(){
        return settingRepository.findAll().stream().map(s -> userConverter.convertToDto(s)).collect(Collectors.toList());
    }
}
