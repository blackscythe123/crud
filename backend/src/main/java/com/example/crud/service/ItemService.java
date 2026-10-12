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

    public List<Item> getAll(){
        return repo.findAll();
    }

    public Item getOne(String id){
        return repo.findById(id).orElse(null);

    }

    public Item create(Item item){
        return repo.save(item);
    }

    public Item update(String id,Item item){
        item.setId(id);
        return repo.save(item);
    }

    public String delete(String id){
        repo.deleteById(id);
        return "delete success";
    }
}
