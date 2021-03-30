package com.tony.service;

import com.tony.service.dto.ProductDTO;
import com.tony.service.dto.ProductRequestDTO;
import com.tony.service.dto.SeoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.tony.domain.Product}.
 */
public interface ProductService {

    ProductDTO save(ProductDTO productDTO);

    Page<ProductDTO> findAll(Pageable pageable);

    Optional<ProductDTO> findOne(Long id);

    void deleteProduct(Long id);

    ProductDTO createProduct(ProductRequestDTO requestDTO);

    ProductDTO updateProduct(Long productId, ProductRequestDTO requestDTO);

    Optional<ProductDTO> findByShortenCode(String code);

    SeoDTO findBySeoPath(String code);
}
