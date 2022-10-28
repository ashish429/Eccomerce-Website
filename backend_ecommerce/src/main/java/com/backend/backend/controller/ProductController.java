package com.backend.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.repository.ProductRepository;
import com.backend.backend.service.ProductSearch;
import com.backend.backend.exception.ResourceNotFoundException;
import com.backend.backend.model.Product;

@SuppressWarnings("unused")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class ProductController {

    @Autowired
    private ProductSearch productSearch;

    @Autowired
    private ProductRepository productRepository;

    // get all product
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // get product by id rest API
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id :" + id));
        return ResponseEntity.ok(product);
    }

    // Search product Rest API
    @RequestMapping(value = "/search/{query}", method = RequestMethod.GET)
    public ResponseEntity<List<Product>> searchProducts(@PathVariable("query") String query) {
        return ResponseEntity.ok(productSearch.searchProducts(query));
    }

    // delete product Rest API
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable int id) {
        try {
            productRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (NoSuchElementException nse) {
            nse.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteProduct(@RequestBody Product product) {
        try {
            productRepository.delete(product);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (NoSuchElementException nse) {
            nse.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
