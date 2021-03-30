package com.tony.web.rest;

import com.tony.domain.enumeration.ProductType;
import com.tony.service.ProductService;
import com.tony.service.dto.ProductDTO;
import com.tony.service.dto.ProductRequestDTO;
import com.tony.service.dto.SeoDTO;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
 * REST controller for managing {@link com.tony.domain.Product}.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    @Autowired
    ProductService productService;

    @GetMapping("/public/products")
    public ResponseEntity<List<ProductDTO>> getPublicGetAllProducts() {
        log.debug("REST request to get a page of Products");
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
        Page<ProductDTO> page = productService.findAll(pageable);
        return ResponseEntity.ok(page.getContent());
    }

    @GetMapping("/public/products/seo/{seoPath}")
    public ResponseEntity<SeoDTO> getProductBySeoPath(@PathVariable String seoPath) {
        SeoDTO seoDTO = productService.findBySeoPath(seoPath);
        return ResponseEntity.ok(seoDTO);
    }

    @GetMapping("/public/products/code/{code}")
    public ResponseEntity<ProductDTO> getProductCode(@PathVariable String code) {
        Optional<ProductDTO> productDTO = productService.findByShortenCode(code);
        return ResponseUtil.wrapOrNotFound(productDTO);
    }

    @GetMapping("/public/products/{id}")
    public ResponseEntity<ProductDTO> getPublicProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<ProductDTO> productDTO = productService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productDTO);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts(Pageable pageable) {
        log.debug("REST request to get a page of Products");
        Page<ProductDTO> page = productService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Optional<ProductDTO> productDTO = productService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productDTO);
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductRequestDTO requestDTO) {

        ProductDTO dto = productService.createProduct(requestDTO);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long productId, @Valid @RequestBody ProductRequestDTO requestDTO) {

        ProductDTO dto = productService.updateProduct(productId, requestDTO);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}
