package com.tony.repository;

import com.tony.domain.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    Page<News> findAllByOrderByCreatedDateDesc(Pageable pageable);

    Page<News> findAllByIdIsNotInOrderByCreatedDateDesc(List<Long> ids, Pageable pageable);

    Optional<News> findByShortenCode(String code);

    Optional<News> findBySeoPath(String seoPath);

    Optional<News> findBySeoPathAndIdNot(String seoPath, Long newsId);
}
