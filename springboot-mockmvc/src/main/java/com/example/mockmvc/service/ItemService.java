package com.example.mockmvc.service;

import com.example.mockmvc.model.Item;
import com.example.mockmvc.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository repo;

    public List<Item> getAll() {
        return repo.findAll();
    }

    public Item getOne(String id) {
        return repo.findById(id).orElse(null);
    }

    public Item create(Item item) {
        if (item.getId() != null && item.getId().trim().isEmpty()) {
            item.setId(null);
        }
        return repo.save(item);
    }

    public Item update(String id, Item item) {
        item.setId(id);
        return repo.save(item);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
