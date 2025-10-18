package com.example.demo.service;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service //tells Spring that this class is a Service component
public class ItemService {

    private final ItemRepository itemRepository; //Dependency Injection

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // CREATE
    public Item addItem(Item item) {
        validateItem(item);
        return itemRepository.save(item);
    }

    private void validateItem(Item item) {
        if (item.getName() == null) {
            throw new IllegalArgumentException("Item name cannot be null");
        }
        if (item.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Item name cannot be empty");
        }
        if (item.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        if (item.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be positive");
        }
    }
    // READ (all)
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // READ (by id)
    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    // UPDATE
    public Item updateItem(Long id, Item updatedItem) {
        return itemRepository.findById(id).map(item -> {
            item.setName(updatedItem.getName());
            item.setCategory(updatedItem.getCategory());
            item.setQuantity(updatedItem.getQuantity());
            item.setPrice(updatedItem.getPrice());
            item.setMinimumStock(updatedItem.getMinimumStock());
            item.setDate(updatedItem.getDate());
            return itemRepository.save(item);
        }).orElse(null);
    }

    // DELETE
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
