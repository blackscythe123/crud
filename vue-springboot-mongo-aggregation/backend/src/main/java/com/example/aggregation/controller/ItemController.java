package com.example.aggregation.controller;

import com.example.aggregation.model.Item;
import com.example.aggregation.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {
    @Autowired
    private ItemService service;

    @GetMapping
    public List<Item> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Item getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PostMapping
    public Item create(@RequestBody Item item) {
        return service.create(item);
    }

    @PutMapping("/{id}")
    public Item update(@PathVariable String id, @RequestBody Item item) {
        return service.update(id, item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
    @PatchMapping("/{id}")
    public Item patch(@PathVariable String id, @RequestBody Item item) {
        return service.patch(id, item);
    }
}
