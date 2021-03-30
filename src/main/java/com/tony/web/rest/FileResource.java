package com.tony.web.rest;

import com.tony.service.dto.FileDTO;
import com.tony.service.dto.FileResourceDTO;
import com.tony.service.processor.FileStorageProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FileResource {

    @Autowired
    FileStorageProcessor fileStorageProcessor;

    @GetMapping("/public/files/{fileName:.+}")
    public ResponseEntity<Resource> viewFile(@PathVariable String fileName, HttpServletRequest request) {
        FileResourceDTO dto = fileStorageProcessor.loadFileAsResource(fileName, request);
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(dto.getContentType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + dto.getResource().getFilename() + "\"")
            .body(dto.getResource());
    }

    @PostMapping("/files/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        FileResourceDTO dto = fileStorageProcessor.loadFileAsResource(fileName, request);
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(dto.getContentType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dto.getResource().getFilename() + "\"")
            .body(dto.getResource());
    }

    @PostMapping("/files")
    public ResponseEntity<FileDTO> uploadFile(@RequestParam("file") MultipartFile file) {
        FileDTO fileDTO = fileStorageProcessor.uploadFile(file);
        return ResponseEntity.ok(fileDTO);
    }

    @PostMapping("/public/files/images")
    public ResponseEntity<Map<String, Object>> uploadPublicFile(@RequestParam("file") MultipartFile file) {
        FileDTO fileDTO = fileStorageProcessor.uploadFileActive(file);
        Map<String, Object> map = new HashMap<>();
        map.put("link", fileDTO.getFileUri());
        return ResponseEntity.ok(map);
    }

}
