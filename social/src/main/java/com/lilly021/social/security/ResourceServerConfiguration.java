package com.lilly021.social.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
    private static final String RESOURCE_ID = "resource-server-rest-api";
    private static final String SECURED_READ_SCOPE = "#oauth2.hasScope('read')";
    private static final String SECURED_WRITE_SCOPE = "#oauth2.hasScope('write')";
    private static final String SECURED_PATTERN = "/secured/**";

    private static final String USER_PATTERN = "/user/**";
    private static final String AUTH_PATTERN = "/auth/**";
    private static final String MESSAGE_PATTERN = "/message/**";
    private static final String FRIENDSHIP_PATTERN = "/friendship/**";
    private static final String POST_PATTERN = "/post/**";
    private static final String RESOURCE_REGISTRY_PATTERN = "/resource/**";
    private static final String RESOURCE_REGISTRY_GET_IMAGE = "/resource/image/name/**";
    private static final String RESOURCE_REGISTRY_GET_DOC = "/resource/doc/name/**";

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.resourceId(RESOURCE_ID);
    }
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/public").permitAll()
                .antMatchers("/test/**").permitAll()
                .antMatchers(RESOURCE_REGISTRY_GET_IMAGE).permitAll()
                .antMatchers(RESOURCE_REGISTRY_GET_DOC).permitAll()
                .antMatchers(AUTH_PATTERN).permitAll()
                .antMatchers(USER_PATTERN).authenticated()
                .antMatchers(MESSAGE_PATTERN).authenticated()
                .antMatchers(FRIENDSHIP_PATTERN).authenticated()
                .antMatchers(POST_PATTERN).authenticated()
                .antMatchers(RESOURCE_REGISTRY_PATTERN).authenticated()
        ;
    }
}
