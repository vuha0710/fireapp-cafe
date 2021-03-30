package com.tony.web.rest;

import com.tony.service.ContactService;
import com.tony.service.dto.ContactDTO;
import com.tony.service.dto.ContactRequestDTO;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tony.domain.Contact}.
 */
@RestController
@RequestMapping("/api")
public class ContactResource {

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Logger log = LoggerFactory.getLogger(ContactResource.class);

    private final ContactService contactService;

    public ContactResource(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contacts/{id}/read")
    public ResponseEntity<Void> readRequest(@PathVariable Long id) {
        contactService.readContact(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/public/contacts/send")
    public ResponseEntity<Void> sendRequest(@RequestBody ContactRequestDTO dto) {
        contactService.sendContact(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<ContactDTO>> getAllContacts(Pageable pageable) {
        log.debug("REST request to get a page of Contacts");
        Page<ContactDTO> page = contactService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/contacts/{id}")
    public ResponseEntity<ContactDTO> getContact(@PathVariable Long id) {
        log.debug("REST request to get Contact : {}", id);
        Optional<ContactDTO> contactDTO = contactService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contactDTO);
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName,  "Xóa thành công!", "")).build();
    }
}
