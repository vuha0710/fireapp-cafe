package com.tony.repository;

import com.tony.domain.DataInsight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface DataInsightRepository extends JpaRepository<DataInsight, Long> {

    Optional<DataInsight> findByKey(String key);

}
