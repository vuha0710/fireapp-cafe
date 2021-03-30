package com.tony.service.impl;

import com.tony.domain.News;
import com.tony.repository.NewsRepository;
import com.tony.service.DataInsightService;
import com.tony.service.FileService;
import com.tony.service.NewsService;
import com.tony.service.dto.NewsDTO;
import com.tony.service.dto.NewsRequestDTO;
import com.tony.service.mapper.NewsMapper;
import com.tony.service.processor.FileStorageProcessor;
import com.tony.service.util.StringUtil;
import com.tony.web.rest.errors.BadRequestAlertException;
import com.tony.web.rest.errors.EntityNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link News}.
 */
@Service
public class NewsServiceImpl implements NewsService {

    private final Logger log = LoggerFactory.getLogger(NewsServiceImpl.class);

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    NewsMapper newsMapper;

    @Autowired
    FileStorageProcessor fileStorageProcessor;

    @Autowired
    FileService fileService;

    @Autowired
    DataInsightService dataInsightService;

    @Override
    public NewsDTO save(NewsDTO newsDTO) {
        log.debug("Request to save News : {}", newsDTO);
        News news = newsMapper.toEntity(newsDTO);
        news = newsRepository.save(news);
        return newsMapper.toDto(news);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NewsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all News");
        return newsRepository.findAllByOrderByCreatedDateDesc(pageable)
            .map(newsMapper::toDto);
    }

    @Override
    public Page<NewsDTO> findAllWithExcludeIds(List<Long> ids, Pageable pageable) {
        return newsRepository.findAllByIdIsNotInOrderByCreatedDateDesc(ids, pageable)
            .map(newsMapper::toDto);
    }

    @Override
    public List<News> findTopNew() {
        Pageable pageable = PageRequest.of(0, 3);
        return newsRepository.findAllByOrderByCreatedDateDesc(pageable).getContent();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<NewsDTO> findOne(Long id) {
        log.debug("Request to get News : {}", id);
        return newsRepository.findById(id)
            .map(newsMapper::toDto);
    }

    @Override
    public NewsDTO createNews(NewsRequestDTO requestDTO) {
        if (StringUtils.isNotEmpty(requestDTO.getSeoPath())) {
            Optional<News> productCheck = newsRepository.findBySeoPath(requestDTO.getSeoPath());
            if (productCheck.isPresent()) {
                throw new BadRequestAlertException("Đường dẫn đã tồn tại");
            }
        }

        News news = new News();
        news.setTitle(requestDTO.getTitle());
        news.setShortenCode(StringUtil.generateShortenCode(requestDTO.getTitle()));
        news.setQuote(requestDTO.getQuote());
        news.setContent(requestDTO.getContent());
        news.setThumbnailUrl(requestDTO.getThumbnailUrl());
        news.setSeoDescription(requestDTO.getSeoDescription());
        news.setSeoKeyword(requestDTO.getSeoKeyword());
        news.setSeoPath(requestDTO.getSeoPath());
        news.setSeoTitle(requestDTO.getSeoTitle());

        if (StringUtils.isEmpty(requestDTO.getSeoPath())) {
            news.setSeoPath(StringUtil.generateShortenCode(requestDTO.getTitle()));
        }

        News newsSaved = newsRepository.save(news);
        fileService.updateActiveFile(requestDTO.getThumbnailUrl());
        dataInsightService.updateDataHomeWithNews();

        return newsMapper.toDto(newsSaved);
    }

    @Override
    public NewsDTO updateNews(Long newsId, NewsRequestDTO requestDTO) {
        if (StringUtils.isNotEmpty(requestDTO.getSeoPath())) {
            Optional<News> productCheck = newsRepository.findBySeoPathAndIdNot(requestDTO.getSeoPath(), newsId);
            if (productCheck.isPresent()) {
                throw new BadRequestAlertException("Đường dẫn đã tồn tại");
            }
        }

        Optional<News> news = newsRepository.findById(newsId);
        if (!news.isPresent()) {
            throw new EntityNotFoundException();
        }

        if (!StringUtils.equals(news.get().getTitle(), requestDTO.getTitle())) {
            news.get().setTitle(requestDTO.getTitle());
            news.get().setShortenCode(StringUtil.generateShortenCode(requestDTO.getTitle()));
        }
        news.get().setQuote(requestDTO.getQuote());
        news.get().setContent(requestDTO.getContent());
        news.get().setThumbnailUrl(requestDTO.getThumbnailUrl());

        news.get().setSeoDescription(requestDTO.getSeoDescription());
        news.get().setSeoKeyword(requestDTO.getSeoKeyword());
        news.get().setSeoPath(requestDTO.getSeoPath());
        news.get().setSeoTitle(requestDTO.getSeoTitle());


        News newsSaved = newsRepository.save(news.get());
        fileService.updateActiveFile(requestDTO.getThumbnailUrl());
        dataInsightService.updateDataHomeWithNews();

        return newsMapper.toDto(newsSaved);
    }

    @Override
    public void deleteNews(Long id) {
        Optional<News> news = newsRepository.findById(id);
        if (!news.isPresent()) {
            throw new EntityNotFoundException();
        }

        fileService.updateDraftFile(news.get().getThumbnailUrl());
        newsRepository.deleteById(id);
        dataInsightService.updateDataHomeWithNews();
    }

    @Override
    public Optional<NewsDTO> findByShortenCode(String code) {
        return newsRepository.findByShortenCode(code).map(newsMapper::toDto);
    }

    @Override
    public Optional<NewsDTO> findBySeoPath(String seoPath) {
        return newsRepository.findBySeoPath(seoPath)
            .map(newsMapper::toDto);
    }

}
