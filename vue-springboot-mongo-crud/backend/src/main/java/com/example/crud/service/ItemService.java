package com.example.crud.service;

import com.example.crud.model.Item;
import com.example.crud.repository.ItemRepository;
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

    public Item getById(String id) {
        return repo.findById(id).orElse(null);
    }

    public Item create(Item item) {
        return repo.save(item);
    }

    public Item update(String id, Item item) {
        item.setId(id);
        return repo.save(item);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
    public Item patch(String id, Item partial) {
        Item existing = getOne(id);
        if (existing != null) {
            if (partial.getName() != null) existing.setName(partial.getName());
            if (partial.getDescription() != null) existing.setDescription(partial.getDescription());
            if (partial.getPrice() != 0) existing.setPrice(partial.getPrice());
            return repo.save(existing);
        }
        return null;
    }
}
