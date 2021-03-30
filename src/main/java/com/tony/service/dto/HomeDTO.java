package com.tony.service.dto;

import java.util.List;

public class HomeDTO {

    private List<HomePartnerDTO> partnerDataList;

    private List<HomeNewsDTO> newsDataList;

    public List<HomePartnerDTO> getPartnerDataList() {
        return partnerDataList;
    }

    public void setPartnerDataList(List<HomePartnerDTO> partnerDataList) {
        this.partnerDataList = partnerDataList;
    }

    public List<HomeNewsDTO> getNewsDataList() {
        return newsDataList;
    }

    public void setNewsDataList(List<HomeNewsDTO> newsDataList) {
        this.newsDataList = newsDataList;
    }
}
