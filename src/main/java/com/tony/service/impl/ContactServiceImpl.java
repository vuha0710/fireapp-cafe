package com.tony.service.impl;

import com.tony.service.ContactService;
import com.tony.domain.Contact;
import com.tony.repository.ContactRepository;
import com.tony.service.dto.ContactDTO;
import com.tony.service.dto.ContactRequestDTO;
import com.tony.service.mapper.ContactMapper;
import com.tony.web.rest.errors.BadRequestAlertException;
import liquibase.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Contact}.
 */
@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    private final Logger log = LoggerFactory.getLogger(ContactServiceImpl.class);

    private final ContactRepository contactRepository;

    private final ContactMapper contactMapper;

    public ContactServiceImpl(ContactRepository contactRepository, ContactMapper contactMapper) {
        this.contactRepository = contactRepository;
        this.contactMapper = contactMapper;
    }

    /**
     * Save a contact.
     *
     * @param contactDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ContactDTO save(ContactDTO contactDTO) {
        log.debug("Request to save Contact : {}", contactDTO);
        Contact contact = contactMapper.toEntity(contactDTO);
        contact = contactRepository.save(contact);
        return contactMapper.toDto(contact);
    }

    /**
     * Get all the contacts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContactDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contacts");
        return contactRepository.findByOrderBySeenAscCreatedDateDesc(pageable)
            .map(contactMapper::toDto);
    }


    /**
     * Get one contact by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ContactDTO> findOne(Long id) {
        log.debug("Request to get Contact : {}", id);
        return contactRepository.findById(id)
            .map(contactMapper::toDto);
    }

    /**
     * Delete the contact by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Contact : {}", id);
        contactRepository.deleteById(id);
    }

    @Override
    public void sendContact(ContactRequestDTO dto) {
        if (StringUtils.isEmpty(dto.getContent())
            || StringUtils.isEmpty(dto.getFullname())
            || StringUtils.isEmpty(dto.getPhone())
            || StringUtils.isEmpty(dto.getEmail())) {
            throw new BadRequestAlertException("Require field");
        }

        Contact contact = new Contact();
        contact.setFullname(dto.getFullname());
        contact.setPhone(dto.getPhone());
        contact.setEmail(dto.getEmail());
        contact.setContent(dto.getContent());
        contactRepository.save(contact);
    }

    @Override
    @Async
    public void readContact(Long contactId) {
        Optional<Contact> contact = contactRepository.findById(contactId);
        if (contact.isPresent()) {
            contact.get().setSeen(true);
            contactRepository.save(contact.get());
        }
    }

    @Override
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
}
