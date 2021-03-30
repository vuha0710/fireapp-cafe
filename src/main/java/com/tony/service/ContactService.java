package com.tony.service;

import com.tony.service.dto.ContactDTO;
import com.tony.service.dto.ContactRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.tony.domain.Contact}.
 */
public interface ContactService {

    ContactDTO save(ContactDTO contactDTO);

    Page<ContactDTO> findAll(Pageable pageable);

    Optional<ContactDTO> findOne(Long id);

    void delete(Long id);

    void sendContact(ContactRequestDTO dto);

    void readContact(Long contactId);

    void deleteContact(Long id);
}
