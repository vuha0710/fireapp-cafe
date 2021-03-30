package com.tony.service.dto;

import java.io.Serializable;
import java.time.Instant;

public class SeoDTO implements Serializable {

    private Long newsId;
    private String newsTitle;
    private String newsShortenCode;
    private String newsThumbnailUrl;
    private String newsQuote;
    private String newsContent;
    private Instant newsCreatedDate;

    private Long productId;
    private String productName;
    private String productShortenCode;
    private String productImageUrl;
    private String productQuote;
    private String productDescription;

    private String seoPath;
    private String seoDescription;
    private String seoTitle;
    private String seoKeyword;

    public Instant getNewsCreatedDate() {
        return newsCreatedDate;
    }

    public void setNewsCreatedDate(Instant newsCreatedDate) {
        this.newsCreatedDate = newsCreatedDate;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Long getNewsId() {
        return newsId;
    }

    public void setNewsId(Long newsId) {
        this.newsId = newsId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsShortenCode() {
        return newsShortenCode;
    }

    public void setNewsShortenCode(String newsShortenCode) {
        this.newsShortenCode = newsShortenCode;
    }

    public String getNewsThumbnailUrl() {
        return newsThumbnailUrl;
    }

    public void setNewsThumbnailUrl(String newsThumbnailUrl) {
        this.newsThumbnailUrl = newsThumbnailUrl;
    }

    public String getNewsQuote() {
        return newsQuote;
    }

    public void setNewsQuote(String newsQuote) {
        this.newsQuote = newsQuote;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductShortenCode() {
        return productShortenCode;
    }

    public void setProductShortenCode(String productShortenCode) {
        this.productShortenCode = productShortenCode;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public void setProductImageUrl(String productImageUrl) {
        this.productImageUrl = productImageUrl;
    }

    public String getProductQuote() {
        return productQuote;
    }

    public void setProductQuote(String productQuote) {
        this.productQuote = productQuote;
    }

    public String getSeoPath() {
        return seoPath;
    }

    public void setSeoPath(String seoPath) {
        this.seoPath = seoPath;
    }

    public String getSeoDescription() {
        return seoDescription;
    }

    public void setSeoDescription(String seoDescription) {
        this.seoDescription = seoDescription;
    }

    public String getSeoTitle() {
        return seoTitle;
    }

    public void setSeoTitle(String seoTitle) {
        this.seoTitle = seoTitle;
    }

    public String getSeoKeyword() {
        return seoKeyword;
    }

    public void setSeoKeyword(String seoKeyword) {
        this.seoKeyword = seoKeyword;
    }
}
