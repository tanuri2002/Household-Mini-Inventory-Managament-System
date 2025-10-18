package com.example.demo.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private int quantity;
    private int price;
    private int minimumStock;
    private String date;

    // Constructors
    public Item() {}

    public Item(String name, String category, int quantity, int price, int minimumStock, String date) {
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.minimumStock = minimumStock;
        this.date = date;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) { this.quantity = quantity; }

    public int getPrice() { return price; }

    public void setPrice(int price) { this.price = price; }

    public int getMinimumStock() { return minimumStock; }

    public void setMinimumStock(int minimumStock) { this.minimumStock = minimumStock; }

    public String getDate() { return date; }

    public void setDate(String date) { this.date = date; }
}
