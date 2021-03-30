package com.tony.service;

import com.tony.service.dto.FileDTO;

public interface FileService {

    void saveNewDraftFile(FileDTO fileDTO);

    void saveNewActiveFile(FileDTO fileDTO);

    void updateActiveFile(String fileUri);

    void updateDraftFile(String fileUri);

}
