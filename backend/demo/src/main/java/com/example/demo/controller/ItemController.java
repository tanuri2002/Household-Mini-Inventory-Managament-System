package com.example.demo.controller;

import com.example.demo.model.Item;
import com.example.demo.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*") //allows all the ports to access

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService; //Dependency Injection-spring automatically provides an instance of ItemService when the controller is created

    public ItemController(ItemService itemService) {   //The controller uses this service to perform all business logic related to items
        this.itemService = itemService;
    }

    // CREATE ENDPOINT_
    @PostMapping //Handles HTTP POST requests (used to create a new item)
    public Item createItem(@RequestBody Item item) { //@RequestBody: Tells Spring to read the request body (JSON from frontend) and convert it into an Item object.
        return itemService.addItem(item); //Calls itemService.addItem(item) to save the item in the database and returns the saved Item back as JSON.
    }

    // READ (all) ENDPOINT
    @GetMapping //Handles HTTP GET requests (read data).
    public List<Item> getAllItems() {
        return itemService.getAllItems(); //Returns a list of all items from the database as JSON.
    }

    // READ (by id)
    @GetMapping("/{id}") //Handles GET requests with a path variable, e.g., /api/items/5
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id); //Uses Optional to check if the item exists
        return item.map(ResponseEntity::ok) //Returns HTTP 200 OK with the item
                .orElse(ResponseEntity.notFound().build()); //Returns HTTP 404 Not Found
    }

    // UPDATE ENDPOINT
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {  //@PathVariable Long id: Captures the id from the URL
        Item item = itemService.updateItem(id, updatedItem);
        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE ENDPOINT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
