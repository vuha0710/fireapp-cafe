package com.tony.service.dto;

import java.time.Instant;

public class HomeNewsDTO {

    private Long id;

    private String title;

    private String shortenCode;

    private String thumbnailUrl;

    private String quote;

    private Instant createdDate;

    public String getShortenCode() {
        return shortenCode;
    }

    public void setShortenCode(String shortenCode) {
        this.shortenCode = shortenCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }
}
