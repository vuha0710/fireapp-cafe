package com.tony.service.schedule;

import com.tony.domain.File;
import com.tony.domain.enumeration.FileStatus;
import com.tony.repository.FileRepository;
import com.tony.service.processor.FileStorageProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.util.List;

//@Service
public class CleanDraftFileSchedule {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    FileStorageProcessor fileStorageProcessor;

    //run scheduled at 0h:00m:01s -  beginning of each day
//    @Scheduled(cron = "1 0 0 * * ?")
    public void proceedCleanDraftFile() {
        Instant now = Instant.now();
        List<File> files = fileRepository.findByFileStatusAndCreatedDateBefore(FileStatus.DRAFT, now);
        if (!CollectionUtils.isEmpty(files)) {
            for (File file : files) {
                fileStorageProcessor.deleteFile(file.getFileName());
            }
            fileRepository.deleteAll(files);
        }
    }
}
