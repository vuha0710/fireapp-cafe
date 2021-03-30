package com.tony.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A News.
 */
@Entity
@Table(name = "news")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class News extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "shorten_code")
    private String shortenCode;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "quote")
    private String quote;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "seo_path")
    private String seoPath;

    @Column(name = "seo_description")
    private String seoDescription;

    @Column(name = "seo_keyword")
    private String seoKeyword;

    @Lob
    @Column(name = "content")
    private String content;

    public String getSeoTitle() {
        return seoTitle;
    }

    public void setSeoTitle(String seoTitle) {
        this.seoTitle = seoTitle;
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

    public String getSeoKeyword() {
        return seoKeyword;
    }

    public void setSeoKeyword(String seoKeyword) {
        this.seoKeyword = seoKeyword;
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

    public String getTitle() {
        return title;
    }

    public News title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public News thumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
        return this;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getQuote() {
        return quote;
    }

    public News quote(String quote) {
        this.quote = quote;
        return this;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getContent() {
        return content;
    }

    public News content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return id != null && id.equals(((News) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", thumbnailUrl='" + getThumbnailUrl() + "'" +
            ", quote='" + getQuote() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
