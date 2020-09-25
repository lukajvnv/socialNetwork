package com.lilly021.social;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiController {

    @GetMapping(value = "/public")
    public Msg publicEndpoint() {
        return new Msg("All good. You DO NOT need to be authenticated to call /api/public.");
    }

    @GetMapping(value = "/private")
    public Msg privateEndpoint() {
        return new Msg("All good. You can see this because you are Authenticated.");
    }

    @GetMapping(value = "/private-scoped")
    public Msg privateScopedEndpoint() {
        return new Msg("All good. You can see this because you are Authenticated with a Token granted the 'read:messages' scope");
    }
}