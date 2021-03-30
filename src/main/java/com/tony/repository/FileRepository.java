package com.tony.repository;

import com.tony.domain.File;
import com.tony.domain.enumeration.FileStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    Optional<File> findByFileUri(String fileUri);

    List<File> findByFileStatusAndCreatedDateBefore(FileStatus fileStatus, Instant beforeTime);

}
