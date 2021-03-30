package com.tony.service;

import com.tony.domain.News;
import com.tony.service.dto.NewsDTO;
import com.tony.service.dto.NewsRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.tony.domain.News}.
 */
public interface NewsService {

    NewsDTO save(NewsDTO newsDTO);

    Page<NewsDTO> findAll(Pageable pageable);

    Page<NewsDTO> findAllWithExcludeIds(List<Long> ids, Pageable pageable);

    List<News> findTopNew();

    Optional<NewsDTO> findOne(Long id);

    NewsDTO createNews(NewsRequestDTO requestDTO);

    NewsDTO updateNews(Long newsId, NewsRequestDTO requestDTO);

    void deleteNews(Long id);

    Optional<NewsDTO> findByShortenCode(String code);

    Optional<NewsDTO> findBySeoPath(String seoPath);
}
