package com.tony.service.dto;

public class HomePartnerDTO {

    private Long id;

    private String name;

    private String imageUrl;

    private int ratePoint;

    private String rateUser;

    private String rateComment;

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

    public int getRatePoint() {
        return ratePoint;
    }

    public void setRatePoint(int ratePoint) {
        this.ratePoint = ratePoint;
    }

    public String getRateUser() {
        return rateUser;
    }

    public void setRateUser(String rateUser) {
        this.rateUser = rateUser;
    }

    public String getRateComment() {
        return rateComment;
    }

    public void setRateComment(String rateComment) {
        this.rateComment = rateComment;
    }
}
