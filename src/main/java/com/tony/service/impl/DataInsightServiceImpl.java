package com.tony.service.impl;

import com.google.gson.Gson;
import com.tony.domain.DataInsight;
import com.tony.domain.News;
import com.tony.domain.Partner;
import com.tony.domain.consts.DataInsightConstant;
import com.tony.repository.DataInsightRepository;
import com.tony.repository.NewsRepository;
import com.tony.repository.PartnerRepository;
import com.tony.service.DataInsightService;
import com.tony.service.dto.HomeDTO;
import com.tony.service.mapper.HomeMapper;
import com.tony.service.mapper.HomeNewsMapper;
import com.tony.service.mapper.HomePartnerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class DataInsightServiceImpl implements DataInsightService {

    @Autowired
    DataInsightRepository dataInsightRepository;

    @Autowired
    HomeMapper homeMapper;

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    PartnerRepository partnerRepository;

    @Autowired
    HomeNewsMapper homeNewsMapper;

    @Autowired
    HomePartnerMapper homePartnerMapper;

    @Override
    public HomeDTO getDataHome() {
        Optional<DataInsight> data = dataInsightRepository.findByKey(DataInsightConstant.HOME_DATA);
        return data.map(dataInsight -> homeMapper.toDto(dataInsight)).orElse(null);
    }

    @Override
    @Async
    public void updateDataHomeWithNews() {
        Pageable pageable = PageRequest.of(0, 5);
        Page<News> list = newsRepository.findAllByOrderByCreatedDateDesc(pageable);
        if (list.hasContent()) {
            Gson gson = new Gson();
            DataInsight dataInsight = getDataInsight();

            String homeData = dataInsight.getValue();
            HomeDTO homeDTO = gson.fromJson(homeData, HomeDTO.class);
            if (homeDTO == null) {
                homeDTO = new HomeDTO();
            }

            homeDTO.setNewsDataList(homeNewsMapper.toDto(list.getContent()));

            String stringHomeDTO = gson.toJson(homeDTO);
            dataInsight.setValue(stringHomeDTO);
            dataInsightRepository.save(dataInsight);
        }
    }

    @Override
    @Async
    public void updateDataHomeWithPartner() {
        Pageable pageable = PageRequest.of(0, 4);
        Page<Partner> list = partnerRepository.findAllByOrderByRatePointDesc(pageable);
        if (list.hasContent()) {
            Gson gson = new Gson();
            DataInsight dataInsight = getDataInsight();

            String homeData = dataInsight.getValue();
            HomeDTO homeDTO = gson.fromJson(homeData, HomeDTO.class);
            if (homeDTO == null) {
                homeDTO = new HomeDTO();
            }

            homeDTO.setPartnerDataList(homePartnerMapper.toDto(list.getContent()));

            String stringHomeDTO = gson.toJson(homeDTO);
            dataInsight.setValue(stringHomeDTO);
            dataInsightRepository.save(dataInsight);
        }
    }

    private DataInsight getDataInsight() {
        DataInsight dataInsight = new DataInsight();
        Optional<DataInsight> data = dataInsightRepository.findByKey(DataInsightConstant.HOME_DATA);
        if (data.isPresent()) {
            dataInsight = data.get();
        } else {
            dataInsight.setKey(DataInsightConstant.HOME_DATA);
        }

        return dataInsight;
    }
}
