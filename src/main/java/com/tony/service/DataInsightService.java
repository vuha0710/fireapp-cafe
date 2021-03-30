package com.tony.service;

import com.tony.service.dto.HomeDTO;

public interface DataInsightService {

    HomeDTO getDataHome();

    void updateDataHomeWithNews();

    void updateDataHomeWithPartner();

}
