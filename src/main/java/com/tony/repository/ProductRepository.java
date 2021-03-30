package com.tony.repository;

import com.tony.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAllByOrderByCreatedDateDesc(Pageable pageable);

    Optional<Product> findByShortenCode(String shortenCode);

    Optional<Product> findBySeoPath(String seoPath);

    Optional<Product> findBySeoPathAndIdNot(String seoPath, Long productId);

}
