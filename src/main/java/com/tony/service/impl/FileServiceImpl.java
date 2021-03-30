package com.tony.service.impl;

import com.tony.domain.File;
import com.tony.domain.enumeration.FileStatus;
import com.tony.repository.FileRepository;
import com.tony.service.FileService;
import com.tony.service.dto.FileDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    FileRepository fileRepository;


    @Override
    @Async
    public void saveNewDraftFile(FileDTO fileDTO) {
        File fileEntity = new File();
        fileEntity.setFileName(fileDTO.getFileName());
        fileEntity.setFileStatus(FileStatus.ACTIVE);
        fileEntity.setFileType(fileDTO.getFileType());
        fileEntity.setFileUri(fileDTO.getFileUri());
        fileEntity.setSize(fileDTO.getSize());
        fileRepository.save(fileEntity);
    }

    @Override
    @Async
    public void saveNewActiveFile(FileDTO fileDTO) {
        File fileEntity = new File();
        fileEntity.setFileName(fileDTO.getFileName());
        fileEntity.setFileStatus(FileStatus.ACTIVE);
        fileEntity.setFileType(fileDTO.getFileType());
        fileEntity.setFileUri(fileDTO.getFileUri());
        fileEntity.setSize(fileDTO.getSize());
        fileRepository.save(fileEntity);
    }

    @Override
    @Transactional
    public void updateActiveFile(String fileUri) {
//        Optional<File> file = fileRepository.findByFileUri(fileUri);
//        if (!file.isPresent()) {
//            throw new FileNotFoundException();
//        }
//
//        file.get().setFileStatus(FileStatus.ACTIVE);
//        fileRepository.save(file.get());
    }

    @Override
    @Transactional
    public void updateDraftFile(String fileUri) {
//        if (StringUtils.isEmpty(fileUri)) {
//            return;
//        }
//
//        Optional<File> file = fileRepository.findByFileUri(fileUri);
//        if (!file.isPresent()) {
//            return;
//        }
//
//        file.get().setFileStatus(FileStatus.DRAFT);
//        fileRepository.save(file.get());
    }
}
