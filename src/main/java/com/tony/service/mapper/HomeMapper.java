package com.tony.service.mapper;

import com.google.gson.Gson;
import com.tony.domain.DataInsight;
import com.tony.service.dto.HomeDTO;
import org.springframework.stereotype.Service;

@Service
public class HomeMapper {

    public HomeDTO toDto(DataInsight dataInsight) {
        Gson g = new Gson();
        return g.fromJson(dataInsight.getValue(), HomeDTO.class);
    }
}
