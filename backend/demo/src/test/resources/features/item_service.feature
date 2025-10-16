Feature: Item Management

  Scenario: Add a valid item
    Given a new item with name "Rice", category "Food", quantity 5, price 100, minimum stock 1, and date "2025-09-25"
    When the item is added
    Then the item is successfully saved
    And the item name is "Rice"
    And the item category is "Food"
    And the item quantity is 5
    And the item price is 100
    And the item minimum stock is 1
    And the item date is "2025-09-25"

  Scenario: Add an item with empty name
    Given a new item with name "", category "Food", quantity 5, price 100, minimum stock 1, and date "2025-09-25"
    When the item is added
    Then an error "Item name cannot be empty" is thrown

  Scenario: Add an item with null name
    Given a new item with name null, category "Food", quantity 5, price 100, minimum stock 1, and date "2025-09-25"
    When the item is added
    Then an error "Item name cannot be null" is thrown

  Scenario: Add an item with invalid quantity
    Given a new item with name "Sugar", category "Food", quantity 0, price 200, minimum stock 1, and date "2025-09-25"
    When the item is added
    Then an error "Quantity must be positive" is thrown

  Scenario: Add an item with invalid price
    Given a new item with name "Soap", category "Toiletries", quantity 3, price 0, minimum stock 1, and date "2025-09-25"
    When the item is added
    Then an error "Price must be positive" is thrown

  Scenario: Update an existing item
    Given an existing item with id 1, name "Oil", category "Food", quantity 2, price 300, minimum stock 1, and date "2025-09-25"
    And an updated item with name "Coconut Oil", category "Food", quantity 5, price 450, minimum stock 2, and date "2025-09-26"
    When the item with id 1 is updated
    Then the item is successfully updated
    And the item name is "Coconut Oil"
    And the item quantity is 5
    And the item price is 450

  Scenario: Delete an existing item
    Given an existing item with id 1
    When the item with id 1 is deleted
    Then the item is removed from the system