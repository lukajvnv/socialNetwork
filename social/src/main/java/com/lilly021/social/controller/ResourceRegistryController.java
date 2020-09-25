package com.lilly021.social.controller;

import com.lilly021.social.dto.ResourceRegistryDto;
import com.lilly021.social.dto.ResourceRegistryFormDto;
import com.lilly021.social.service.ResourceRegistryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/resource")
public class ResourceRegistryController {

    @Autowired
    private ResourceRegistryService resourceRegistryService;

    @PostMapping("/image/upload")
    public ResponseEntity<String> singleFileUpload(@RequestParam("file") MultipartFile file) {
        resourceRegistryService.uploadImage(file);
        return new ResponseEntity<>("Image uploaded", HttpStatus.OK);
    }

    @GetMapping("/image/name/{name}")
    public byte[] getImage(@PathVariable String name) {
        return resourceRegistryService.getImage(name);
    }

    @PostMapping("/doc/upload")
    public ResponseEntity<?> docFileUpload(@RequestParam("file") MultipartFile file) {
        resourceRegistryService.uploadFile(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/doc/name/{name}")
    public byte[] getDoc(@PathVariable String name) {
        return resourceRegistryService.getDoc(name);
    }

    @PostMapping("/post/image/upload")
    public ResponseEntity<?> postImageUpload(@ModelAttribute ResourceRegistryFormDto resourceRegistryFormDto) {
        resourceRegistryService.createNewResourceRegistry(resourceRegistryFormDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
