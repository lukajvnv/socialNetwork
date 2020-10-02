package com.lilly021.social.service;

import com.lilly021.social.dto.ResourceRegistryDto;
import com.lilly021.social.dto.ResourceRegistryFormDto;
import com.lilly021.social.model.ResourceRegistry;
import com.lilly021.social.model.post.Post;
import com.lilly021.social.model.user.User;
import com.lilly021.social.repository.PostRepository;
import com.lilly021.social.repository.ResourceRegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;

@Service
public class ResourceRegistryService {

    private static final String IMAGE_FOLDER= "images/";
    private static final String DOCS_FOLDER= "docs/";

    @Autowired
    private ResourceRegistryRepository resourceRegistryRepository;

    @Autowired
    private PostRepository postRepository;

    public boolean uploadImage(MultipartFile profileImage) {
        try {
            String fileName = profileImage.getOriginalFilename();
            int dotIndex =  fileName.lastIndexOf('.');
            String fileType = fileName.substring(dotIndex + 1, fileName.length());
            String fileUrl = IMAGE_FOLDER + fileName;

            File outputfile = new File(fileUrl);

            ByteArrayInputStream bis = new ByteArrayInputStream(profileImage.getBytes());
            BufferedImage bImage = ImageIO.read(bis);
            ImageIO.write(bImage, fileType, outputfile);

            return true;

        } catch (IOException e) {
            System.out.println("Exception occured :" + e.getMessage());
            return false;
        }

    }

    public boolean uploadFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            int dotIndex =  fileName.lastIndexOf('.');
            String fileType = fileName.substring(dotIndex + 1, fileName.length());

            String fileUrl = DOCS_FOLDER + fileName;

            File outputfile = new File(fileUrl);
            OutputStream out = new FileOutputStream(fileUrl);
            out.write(file.getBytes());
            out.close();

            return true;

        } catch (IOException e) {
            System.out.println("Exception occured :" + e.getMessage());
            return false;
        }

    }

    public byte[] getImage(String fileName) {
        String fileUrl = IMAGE_FOLDER + fileName;

        File outputFile = new File(fileUrl);
        try {
            byte[] ui = Files.readAllBytes(outputFile.toPath());
            return ui;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public byte[] getDoc(String fileName) {
        String fileUrl = DOCS_FOLDER + fileName;

        File outputFile = new File(fileUrl);
        try {
            byte[] ui = Files.readAllBytes(outputFile.toPath());
            return ui;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ResourceRegistryDto createNewResourceRegistry(ResourceRegistryFormDto resourceRegistryDto){
        uploadImage(resourceRegistryDto.getFile());
        Post post = getPost(resourceRegistryDto.getPost());
        String uri = resourceRegistryDto.getFile().getOriginalFilename();
        ResourceRegistry resourceRegistry = ResourceRegistry
                .builder()
                .resourceType(resourceRegistryDto.getResourceType())
                .post(post)
                .uri(uri)
                .build();
        ResourceRegistry s = resourceRegistryRepository.save(resourceRegistry);
        ResourceRegistryDto resourceRegistryDto1 = ResourceRegistryDto.builder().build();
        return resourceRegistryDto1;
    }

    private Post getPost(Long id){
        return postRepository.getOne(id);
    }
}
