package com.tony.service.processor;

import com.tony.config.ApplicationProperties;
import com.tony.service.FileService;
import com.tony.service.dto.FileDTO;
import com.tony.service.dto.FileResourceDTO;
import com.tony.web.rest.errors.BadRequestAlertException;
import com.tony.web.rest.errors.FileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FileStorageProcessor {

    private final Path fileStorageLocation;

    @Autowired
    FileService fileService;

    @Autowired
    Environment env;

    @Autowired
    public FileStorageProcessor(ApplicationProperties applicationProperties) {
        this.fileStorageLocation = Paths.get(applicationProperties.getUploadDir())
            .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new BadRequestAlertException("Could not create the directory where the uploaded files will be stored.");
        }
    }

    public FileDTO uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = storeFile(file);

        String fileViewUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/public/files/")
            .path(fileName)
            .toUriString();
//        String fileViewUri = "/api/public/files/".concat(fileName);

        FileDTO fileDTO = new FileDTO(fileName, fileViewUri,
            file.getContentType(), file.getSize());

        fileService.saveNewDraftFile(fileDTO);
        return fileDTO;
    }

    public FileDTO uploadFileActive(@RequestParam("file") MultipartFile file) {
        String fileName = storeFile(file);

        String fileViewUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/public/files/")
            .path(fileName)
            .toUriString();

        FileDTO fileDTO = new FileDTO(fileName, fileViewUri,
            file.getContentType(), file.getSize());

        fileService.saveNewActiveFile(fileDTO);
        return fileDTO;
    }

    public List<FileDTO> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.stream(files)
            .map(this::uploadFile)
            .collect(Collectors.toList());
    }

    public boolean deleteFile(String fileName) {
        try {
            File file = this.fileStorageLocation.resolve(fileName).toFile();
            return file.delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public FileResourceDTO loadFileAsResource(String fileName, HttpServletRequest request) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                // Try to determine file's content type
                String contentType = null;
                try {
                    contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                // Fallback to the default content type if type could not be determined
                if(contentType == null) {
                    contentType = "application/octet-stream";
                }

                FileResourceDTO dto = new FileResourceDTO();
                dto.setResource(resource);
                dto.setContentType(contentType);
                return dto;
            } else {
                throw new FileNotFoundException();
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException();
        }
    }

    private String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new BadRequestAlertException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            fileName = System.currentTimeMillis() + "_" + fileName;

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            ex.printStackTrace();
            throw new BadRequestAlertException("Could not store file " + fileName + ". Please try again!");
        }
    }

}
