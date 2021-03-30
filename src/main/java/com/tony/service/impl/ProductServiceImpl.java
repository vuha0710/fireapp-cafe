package com.tony.service.impl;

import com.tony.domain.News;
import com.tony.domain.Product;
import com.tony.repository.NewsRepository;
import com.tony.repository.ProductRepository;
import com.tony.service.FileService;
import com.tony.service.ProductService;
import com.tony.service.dto.ProductDTO;
import com.tony.service.dto.ProductRequestDTO;
import com.tony.service.dto.SeoDTO;
import com.tony.service.mapper.ProductMapper;
import com.tony.service.processor.FileStorageProcessor;
import com.tony.service.util.StringUtil;
import com.tony.web.rest.errors.BadRequestAlertException;
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
 * Service Implementation for managing {@link Product}.
 */
@Service
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    ProductRepository productRepository;
    @Autowired
    NewsRepository newsRepository;

    @Autowired
    ProductMapper productMapper;

    @Autowired
    FileStorageProcessor fileStorageProcessor;

    @Autowired
    FileService fileService;

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAllByOrderByCreatedDateDesc(pageable)
            .map(productMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findById(id)
            .map(productMapper::toDto);
    }

    @Override
    @Transactional
    public ProductDTO createProduct(ProductRequestDTO requestDTO) {
        if (StringUtils.isNotEmpty(requestDTO.getSeoPath())) {
            Optional<Product> productCheck = productRepository.findBySeoPath(requestDTO.getSeoPath());
            if (productCheck.isPresent()) {
                throw new BadRequestAlertException("Đường dẫn đã tồn tại");
            }
        }

        Product product = new Product();
        product.setName(requestDTO.getName());
        product.setShortenCode(StringUtil.generateShortenCode(requestDTO.getName()));
        product.setImageUrl(requestDTO.getImageUrl());
        product.setProductType(requestDTO.getProductType());
        product.setQuote(requestDTO.getQuote());
        product.setDescription(requestDTO.getDescription());
        product.setSeoDescription(requestDTO.getSeoDescription());
        product.setSeoKeyword(requestDTO.getSeoKeyword());
        product.setSeoPath(requestDTO.getSeoPath());
        product.setSeoTitle(requestDTO.getSeoTitle());

        if (StringUtils.isEmpty(requestDTO.getSeoPath())) {
            product.setSeoPath(StringUtil.generateShortenCode(requestDTO.getName()));
        }

        Product productSaved = productRepository.save(product);
        fileService.updateActiveFile(requestDTO.getImageUrl());

        return productMapper.toDto(productSaved);
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductRequestDTO requestDTO) {
        if (StringUtils.isNotEmpty(requestDTO.getSeoPath())) {
            Optional<Product> productCheck = productRepository.findBySeoPathAndIdNot(requestDTO.getSeoPath(), productId);
            if (productCheck.isPresent()) {
                throw new BadRequestAlertException("Đường dẫn đã tồn tại");
            }
        }

        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new EntityNotFoundException();
        }

        if (!StringUtils.equals(product.get().getName(), requestDTO.getName())) {
            product.get().setName(requestDTO.getName());
            product.get().setShortenCode(StringUtil.generateShortenCode(requestDTO.getName()));
        }
        product.get().setImageUrl(requestDTO.getImageUrl());
        product.get().setProductType(requestDTO.getProductType());
        product.get().setQuote(requestDTO.getQuote());
        product.get().setDescription(requestDTO.getDescription());
        product.get().setSeoDescription(requestDTO.getSeoDescription());
        product.get().setSeoKeyword(requestDTO.getSeoKeyword());
        product.get().setSeoPath(requestDTO.getSeoPath());
        product.get().setSeoTitle(requestDTO.getSeoTitle());

        Product productSaved = productRepository.save(product.get());

        return productMapper.toDto(productSaved);
    }

    @Override
    public Optional<ProductDTO> findByShortenCode(String code) {
        return productRepository.findByShortenCode(code)
            .map(productMapper::toDto);
    }

    @Override
    public SeoDTO findBySeoPath(String code) {
        SeoDTO dto = new SeoDTO();
        Optional<Product> product = productRepository.findBySeoPath(code);
        if (product.isPresent()) {
            dto.setProductId(product.get().getId());
            dto.setProductImageUrl(product.get().getImageUrl());
            dto.setProductName(product.get().getName());
            dto.setProductQuote(product.get().getQuote());
            dto.setProductShortenCode(product.get().getShortenCode());
            dto.setSeoDescription(product.get().getSeoDescription());
            dto.setSeoPath(product.get().getSeoPath());
            dto.setSeoKeyword(product.get().getSeoKeyword());
            dto.setSeoTitle(product.get().getSeoTitle());
            dto.setProductDescription(product.get().getDescription());
        } else {
            Optional<News> news = newsRepository.findBySeoPath(code);
            if (news.isPresent()) {
                dto.setNewsId(news.get().getId());
                dto.setNewsThumbnailUrl(news.get().getThumbnailUrl());
                dto.setNewsTitle(news.get().getTitle());
                dto.setNewsQuote(news.get().getQuote());
                dto.setNewsShortenCode(news.get().getShortenCode());
                dto.setNewsContent(news.get().getContent());
                dto.setSeoDescription(news.get().getSeoDescription());
                dto.setSeoPath(news.get().getSeoPath());
                dto.setSeoKeyword(news.get().getSeoKeyword());
                dto.setSeoTitle(news.get().getSeoTitle());
                dto.setNewsCreatedDate(news.get().getCreatedDate());
            }
        }
        return dto;
    }

    @Override
    public void deleteProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent()) {
            throw new EntityNotFoundException();
        }

        fileService.updateDraftFile(product.get().getImageUrl());
        productRepository.deleteById(id);
    }
}
