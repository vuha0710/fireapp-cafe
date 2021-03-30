package com.tony.service.dto;
import com.tony.domain.enumeration.ProductType;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.tony.domain.Product} entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    private String name;

    private String shortenCode;

    private String imageUrl;

    private ProductType productType;

    private String quote;

    private String seoPath;

    private String seoDescription;

    private String seoTitle;

    private String seoKeyword;

    @Lob
    private String description;

    public String getSeoKeyword() {
        return seoKeyword;
    }

    public void setSeoKeyword(String seoKeyword) {
        this.seoKeyword = seoKeyword;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
