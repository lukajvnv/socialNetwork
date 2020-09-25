package com.lilly021.social.controller;

import com.lilly021.social.dto.user.SettingDto;
import com.lilly021.social.dto.user.UserAttributeDto;
import com.lilly021.social.dto.user.UserDto;
import com.lilly021.social.dto.user.UserSettingDto;
import com.lilly021.social.model.user.Setting;
import com.lilly021.social.service.AuthService;
import com.lilly021.social.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("/current")
    public UserDto getCurrentUser(Principal principal){
        String username = principal.getName();
        return userService.getUser(username);
    }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id){
        return userService.getOne(id);
    }

    @PostMapping
    public UserDto update(@RequestBody UserDto userDto){
        return userService.save(userDto);
    }

    @GetMapping("/setting")
    public List<UserSettingDto> getUserSetting(Principal principal){
        return userService.getUserSetting(principal.getName());
    }

    @PostMapping("/setting")
    public List<UserSettingDto> updateSetting(@RequestBody UserDto userDto, Principal principal){
        return userService.updateUserSetting(principal.getName(), userDto);
    }

    @GetMapping("/attributeDatasource")
    public List<UserAttributeDto> getUserAttributeDataSource(){
        return userService.getUserAttributeDataSource();
    }

    @GetMapping("/settingDatasource")
    public List<SettingDto> getUserSettingDatasource(){
        return userService.getUserSettingDataSource();
    }
}
