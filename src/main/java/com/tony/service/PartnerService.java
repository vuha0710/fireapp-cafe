package com.tony.service;

import java.util.Optional;

import com.tony.service.dto.PartnerDTO;
import com.tony.service.dto.PartnerRequestDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.tony.domain.Partner}.
 */
public interface PartnerService {

    PartnerDTO save(PartnerDTO partnerDTO);

    Page<PartnerDTO> findAll(Pageable pageable);

    Optional<PartnerDTO> findOne(Long id);

    PartnerDTO createPartner(PartnerRequestDTO requestDTO);

    PartnerDTO updatePartner(Long partnerId, PartnerRequestDTO requestDTO);

    void deletePartner(Long id);
}
