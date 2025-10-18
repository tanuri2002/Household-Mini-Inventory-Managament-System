package com.example.demo.service;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemService itemService;

    @Test
    void testAddItem() {
        Item item = new Item("Rice", "Food", 5, 100, 1, "2025-09-25");
        when(itemRepository.save(item)).thenReturn(item);
        Item savedItem = itemService.addItem(item);
        assertEquals("Rice", savedItem.getName());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void testGetAllItems() {
        Item item1 = new Item("Sugar", "Food", 2, 200, 1, "2025-09-25");
        Item item2 = new Item("Soap", "Toiletries", 3, 50, 1, "2025-09-25");
        when(itemRepository.findAll()).thenReturn(Arrays.asList(item1, item2));
        assertEquals(2, itemService.getAllItems().size());
        assertEquals("Sugar", itemService.getAllItems().get(0).getName());
    }

    @Test
    void testGetItemById() {
        Item item = new Item("Milk", "Food", 1, 120, 1, "2025-09-25");
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        Optional<Item> result = itemService.getItemById(1L);
        assertTrue(result.isPresent());
        assertEquals("Milk", result.get().getName());
    }

    @Test
    void testUpdateItem() {
        Item existing = new Item("Oil", "Food", 2, 300, 1, "2025-09-25");
        Item updated = new Item("Coconut Oil", "Food", 5, 450, 2, "2025-09-26");
        when(itemRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(itemRepository.save(existing)).thenReturn(existing);
        Item result = itemService.updateItem(1L, updated);
        assertNotNull(result);
        assertEquals("Coconut Oil", result.getName());
        assertEquals(5, result.getQuantity());
        verify(itemRepository, times(1)).save(existing);
    }

    @Test
    void testDeleteItem() {
        doNothing().when(itemRepository).deleteById(1L);
        itemService.deleteItem(1L);
        verify(itemRepository, times(1)).deleteById(1L);
    }
//
//    @Test
//    void testAddItemWithEmptyNameThrowsException() {
//        Item item = new Item("", "Food", 5, 100, 1, "2025-09-25");
//        assertThrows(IllegalArgumentException.class, () -> itemService.addItem(item),
//                "Item name cannot be empty");
//    }
//
//    @Test
//    void testAddItemWithNullNameThrowsException() {
//        Item item = new Item(null, "Food", 5, 100, 1, "2025-09-25");
//        assertThrows(IllegalArgumentException.class, () -> itemService.addItem(item),
//                "Item name cannot be null");
//    }
}