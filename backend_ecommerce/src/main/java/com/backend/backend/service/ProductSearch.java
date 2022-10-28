package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.Product;
import com.backend.backend.repository.ProductRepository;

import java.util.List;

@Service
public class ProductSearch {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> AllProducts() {
        List<Product> productList = (List<Product>) productRepository.findAll();
        return productList;
    }

    public List<Product> searchProducts(String query) {
        List<Product> productList = productRepository.searchProducts(query);
        return productList;
    }
}
