package com.tony.web.rest;

import com.tony.service.PartnerService;
import com.tony.service.dto.PartnerRequestDTO;
import com.tony.service.dto.PartnerDTO;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tony.domain.Partner}.
 */
@RestController
@RequestMapping("/api")
public class PartnerResource {

    private final Logger log = LoggerFactory.getLogger(PartnerResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    PartnerService partnerService;

    @GetMapping("/partners")
    public ResponseEntity<List<PartnerDTO>> getAllPartners(Pageable pageable) {
        log.debug("REST request to get a page of Partners");
        Page<PartnerDTO> page = partnerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/partners/{id}")
    public ResponseEntity<PartnerDTO> getPartner(@PathVariable Long id) {
        log.debug("REST request to get Partner : {}", id);
        Optional<PartnerDTO> partnerDTO = partnerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(partnerDTO);
    }

    @PostMapping("/partners")
    public ResponseEntity<PartnerDTO> createPartner(@Valid @RequestBody PartnerRequestDTO requestDTO) {

        PartnerDTO partner = partnerService.createPartner(requestDTO);
        return ResponseEntity.ok(partner);
    }

    @PutMapping("/partners/{partnerId}")
    public ResponseEntity<PartnerDTO> updatePartner(@PathVariable Long partnerId, @Valid @RequestBody PartnerRequestDTO requestDTO) {

        PartnerDTO partner = partnerService.updatePartner(partnerId, requestDTO);
        return ResponseEntity.ok(partner);
    }

    @DeleteMapping("/partners/{id}")
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        partnerService.deletePartner(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName,  "A partner is deleted successfully", "")).build();
    }
}
