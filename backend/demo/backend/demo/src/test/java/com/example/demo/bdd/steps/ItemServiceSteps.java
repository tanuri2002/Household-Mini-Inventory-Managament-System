package com.example.demo.bdd.steps;

import com.example.demo.model.Item;
import com.example.demo.service.ItemService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@CucumberContextConfiguration
@SpringBootTest
public class ItemServiceSteps {

    @Autowired
    private ItemService itemService;

    @MockBean
    private com.example.demo.repository.ItemRepository itemRepository;

    private Item item;
    private Item updatedItem;
    private Item result;
    private Exception exception;

    @Given("a new item with name {string}, category {string}, quantity {int}, price {int}, minimum stock {int}, and date {string}")
    public void a_new_item_with_name_category_quantity_price_minimum_stock_and_date(String name, String category, int quantity, int price, int minimumStock, String date) {
        item = new Item(name, category, quantity, price, minimumStock, date);
    }

    @Given("a new item with name null, category {string}, quantity {int}, price {int}, minimum stock {int}, and date {string}")
    public void a_new_item_with_name_null_category_quantity_price_minimum_stock_and_date(String category, int quantity, int price, int minimumStock, String date) {
        item = new Item(null, category, quantity, price, minimumStock, date);
    }

    @Given("an existing item with id {long}, name {string}, category {string}, quantity {int}, price {int}, minimum stock {int}, and date {string}")
    public void an_existing_item_with_id_name_category_quantity_price_minimum_stock_and_date(Long id, String name, String category, int quantity, int price, int minimumStock, String date) {
        item = new Item(name, category, quantity, price, minimumStock, date);
        item.setId(id);
        when(itemRepository.findById(id)).thenReturn(Optional.of(item));
    }

    @Given("an updated item with name {string}, category {string}, quantity {int}, price {int}, minimum stock {int}, and date {string}")
    public void an_updated_item_with_name_category_quantity_price_minimum_stock_and_date(String name, String category, int quantity, int price, int minimumStock, String date) {
        updatedItem = new Item(name, category, quantity, price, minimumStock, date);
    }

    @Given("an existing item with id {long}")
    public void an_existing_item_with_id(Long id) {
        item = new Item("TestItem", "TestCategory", 1, 100, 1, "2025-09-25");
        item.setId(id);
        when(itemRepository.findById(id)).thenReturn(Optional.of(item));
    }

    @When("the item is added")
    public void the_item_is_added() {
        try {
            when(itemRepository.save(any(Item.class))).thenReturn(item); // Mock save to return the item
            result = itemService.addItem(item);
        } catch (Exception e) {
            exception = e;
        }
    }

    @When("the item with id {long} is updated")
    public void the_item_with_id_is_updated(Long id) {
        try {
            when(itemRepository.findById(id)).thenReturn(Optional.of(item));
            when(itemRepository.save(any(Item.class))).thenReturn(updatedItem);
            result = itemService.updateItem(id, updatedItem);
        } catch (Exception e) {
            exception = e;
        }
    }

    @When("the item with id {long} is deleted")
    public void the_item_with_id_is_deleted(Long id) {
        try {
            doNothing().when(itemRepository).deleteById(id);
            itemService.deleteItem(id);
        } catch (Exception e) {
            exception = e;
        }
    }

    @Then("the item is successfully saved")
    public void the_item_is_successfully_saved() {
        assertNotNull(result);
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Then("the item name is {string}")
    public void the_item_name_is(String expectedName) {
        assertEquals(expectedName, result.getName());
    }

    @Then("the item category is {string}")
    public void the_item_category_is(String expectedCategory) {
        assertEquals(expectedCategory, result.getCategory());
    }

    @Then("the item quantity is {int}")
    public void the_item_quantity_is(int expectedQuantity) {
        assertEquals(expectedQuantity, result.getQuantity());
    }

    @Then("the item price is {int}")
    public void the_item_price_is(int expectedPrice) {
        assertEquals(expectedPrice, result.getPrice());
    }

    @Then("the item minimum stock is {int}")
    public void the_item_minimum_stock_is(int expectedMinimumStock) {
        assertEquals(expectedMinimumStock, result.getMinimumStock());
    }

    @Then("the item date is {string}")
    public void the_item_date_is(String expectedDate) {
        assertEquals(expectedDate, result.getDate());
    }

    @Then("an error {string} is thrown")
    public void an_error_is_thrown(String expectedMessage) {
        assertNotNull(exception);
        assertEquals(expectedMessage, exception.getMessage());
    }

    @Then("the item is successfully updated")
    public void the_item_is_successfully_updated() {
        assertNotNull(result);
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Then("the item is removed from the system")
    public void the_item_is_removed_from_the_system() {
        verify(itemRepository, times(1)).deleteById(any(Long.class));
    }
}