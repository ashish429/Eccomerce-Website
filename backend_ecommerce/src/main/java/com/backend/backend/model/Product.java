package com.backend.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

@Entity
@Component
@Table(name = "product")
@JacksonXmlRootElement(localName = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "price")
    private double price;

    @Column(name = "serviceability")
    private String serviceability;

    public Product() {
        super();

    }

    public Product(int productId, String productName, String image, String brand, String description, double price,
            String serviceability) {
        super();
        this.productId = productId;
        this.productName = productName;
        this.brand = brand;
        this.image = image;
        this.description = description;
        this.price = price;
        this.serviceability = serviceability;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getServiceability() {
        return serviceability;
    }

    public void setServiceability(String serviceability) {
        this.serviceability = serviceability;
    }

    @Override
    public String toString() {
        return "Product{" + "productId=" + productId + ", productName='" + productName + '\'' + ", brand='" + brand
                + '\'' + ",description='" + description + '\'' + '\'' + ",image='" + image + '\'' + ", price='" + price
                + '\'' + ", serviceability='"
                + serviceability + '\'' + '}';
    }
}
