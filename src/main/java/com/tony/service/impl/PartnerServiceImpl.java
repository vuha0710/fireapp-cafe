package com.tony.service.impl;

import com.tony.domain.Partner;
import com.tony.repository.PartnerRepository;
import com.tony.service.DataInsightService;
import com.tony.service.FileService;
import com.tony.service.PartnerService;
import com.tony.service.dto.PartnerDTO;
import com.tony.service.dto.PartnerRequestDTO;
import com.tony.service.mapper.PartnerMapper;
import com.tony.service.processor.FileStorageProcessor;
import com.tony.web.rest.errors.EntityNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Partner}.
 */
@Service
public class PartnerServiceImpl implements PartnerService {

    private final Logger log = LoggerFactory.getLogger(PartnerServiceImpl.class);

    @Autowired
    PartnerRepository partnerRepository;

    @Autowired
    PartnerMapper partnerMapper;

    @Autowired
    FileStorageProcessor fileStorageProcessor;

    @Autowired
    FileService fileService;

    @Autowired
    DataInsightService dataInsightService;

    @Override
    public PartnerDTO createPartner(PartnerRequestDTO requestDTO) {
        Partner partner = new Partner();

        partner.setName(requestDTO.getName());
        partner.setImageUrl(requestDTO.getImageUrl());
        partner.setRatePoint(requestDTO.getRatePoint());

        if (StringUtils.isNotEmpty(requestDTO.getRateUser()) && StringUtils.isNotEmpty(requestDTO.getRateComment())) {
            partner.setRateUser(requestDTO.getRateUser());
            partner.setRateComment(requestDTO.getRateComment());
        }

        Partner partnerSaved = partnerRepository.save(partner);
        fileService.updateActiveFile(requestDTO.getImageUrl());
        dataInsightService.updateDataHomeWithPartner();

        return partnerMapper.toDto(partnerSaved);
    }

    @Override
    public PartnerDTO updatePartner(Long partnerId, PartnerRequestDTO requestDTO) {
        Optional<Partner> partner = partnerRepository.findById(partnerId);
        if (!partner.isPresent()) {
            throw new EntityNotFoundException();
        }

        partner.get().setName(requestDTO.getName());
        partner.get().setImageUrl(requestDTO.getImageUrl());
        partner.get().setRatePoint(requestDTO.getRatePoint());

        if (StringUtils.isNotEmpty(requestDTO.getRateUser()) && StringUtils.isNotEmpty(requestDTO.getRateComment())) {
            partner.get().setRateUser(requestDTO.getRateUser());
            partner.get().setRateComment(requestDTO.getRateComment());
        }

        Partner partnerSaved = partnerRepository.save(partner.get());
        fileService.updateActiveFile(requestDTO.getImageUrl());
        dataInsightService.updateDataHomeWithPartner();

        return partnerMapper.toDto(partnerSaved);
    }

    @Override
    public void deletePartner(Long id) {
        Optional<Partner> partner = partnerRepository.findById(id);
        if (!partner.isPresent()) {
            throw new EntityNotFoundException();
        }

        fileService.updateDraftFile(partner.get().getImageUrl());
        partnerRepository.deleteById(id);
        dataInsightService.updateDataHomeWithPartner();
    }

    @Override
    public PartnerDTO save(PartnerDTO partnerDTO) {
        log.debug("Request to save Partner : {}", partnerDTO);
        Partner partner = partnerMapper.toEntity(partnerDTO);
        partner = partnerRepository.save(partner);
        dataInsightService.updateDataHomeWithPartner();
        return partnerMapper.toDto(partner);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PartnerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Partners");
        return partnerRepository.findAll(pageable)
            .map(partnerMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PartnerDTO> findOne(Long id) {
        log.debug("Request to get Partner : {}", id);
        return partnerRepository.findById(id)
            .map(partnerMapper::toDto);
    }

}
