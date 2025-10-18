package com.example.demo.repository;

import com.example.demo.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //Tells Spring that this is a Repository Bean (data access layer)
public interface ItemRepository extends JpaRepository<Item, Long> { //JPA - Java Persistence API
}
