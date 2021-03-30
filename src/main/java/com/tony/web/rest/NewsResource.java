package com.tony.web.rest;

import com.tony.domain.News;
import com.tony.service.NewsService;
import com.tony.service.dto.NewsDTO;
import com.tony.service.dto.NewsRequestDTO;
import com.tony.service.dto.NewsTopDTO;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tony.domain.News}.
 */
@RestController
@RequestMapping("/api")
public class NewsResource {

    private final Logger log = LoggerFactory.getLogger(NewsResource.class);

    @Autowired
    NewsService newsService;

    @GetMapping("/public/news/top")
    public ResponseEntity<List<NewsTopDTO>> getPublicTopNews() {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd MM yyyy").withZone(ZoneId.of("UTC"));

        List<NewsTopDTO> result = new ArrayList<>();
        List<News> news = newsService.findTopNew();
        news.forEach(item -> {
            NewsTopDTO dto = new NewsTopDTO();
            if (item.getCreatedDate() != null) {
                String[] createdDate = dateTimeFormatter.format(item.getCreatedDate()).split(" ");
                dto.setDay(createdDate[0]);
                dto.setMonth(createdDate[1]);
                dto.setYear(createdDate[2]);
            }
            dto.setId(item.getId());
            dto.setQuote(item.getQuote());
            dto.setThumbnailUrl(item.getThumbnailUrl());
            dto.setTitle(item.getTitle());
            dto.setShortenCode(item.getShortenCode());
            result.add(dto);
        });
        return ResponseEntity.ok(result);
    }

    @GetMapping("/public/news/seo/{seoPath}")
    public ResponseEntity<NewsDTO> getProductBySeoPath(@PathVariable String seoPath) {
        Optional<NewsDTO> newsDTO = newsService.findBySeoPath(seoPath);
        return ResponseUtil.wrapOrNotFound(newsDTO);
    }

    @GetMapping("/public/news")
    public ResponseEntity<List<NewsDTO>> getPublicAllNews(@RequestParam(required = false) List<Long> ids, Pageable pageable) {
        Page<NewsDTO> page = newsService.findAllWithExcludeIds(ids, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/public/news/{id}")
    public ResponseEntity<NewsDTO> getPublicNews(@PathVariable Long id) {
        Optional<NewsDTO> newsDTO = newsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(newsDTO);
    }

    @GetMapping("/public/news/code/{code}")
    public ResponseEntity<NewsDTO> getPublicNewsCode(@PathVariable String code) {
        Optional<NewsDTO> newsDTO = newsService.findByShortenCode(code);
        return ResponseUtil.wrapOrNotFound(newsDTO);
    }

    @GetMapping("/news")
    public ResponseEntity<List<NewsDTO>> getAllNews(Pageable pageable) {
        log.debug("REST request to get a page of News");
        Page<NewsDTO> page = newsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/news/{id}")
    public ResponseEntity<NewsDTO> getNews(@PathVariable Long id) {
        log.debug("REST request to get News : {}", id);
        Optional<NewsDTO> newsDTO = newsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(newsDTO);
    }

    @PostMapping("/news")
    public ResponseEntity<NewsDTO> createNews(@Valid @RequestBody NewsRequestDTO requestDTO) {

        NewsDTO dto = newsService.createNews(requestDTO);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/news/{newsId}")
    public ResponseEntity<NewsDTO> updateNews(@PathVariable Long newsId, @Valid @RequestBody NewsRequestDTO requestDTO) {

        NewsDTO dto = newsService.updateNews(newsId, requestDTO);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/news/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok().build();
    }
}
