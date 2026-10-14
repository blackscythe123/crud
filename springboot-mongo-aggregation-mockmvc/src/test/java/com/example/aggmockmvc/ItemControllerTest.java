package com.example.aggmockmvc;

import com.example.aggmockmvc.controller.ItemController;
import com.example.aggmockmvc.model.Item;
import com.example.aggmockmvc.service.ItemService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ItemController.class)
class ItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ItemService service;

    @Test
    void testGetAll() throws Exception {
        Item item = new Item("1", "Monitor", "4K UHD", 399.99, "Electronics", 10);
        when(service.getAll()).thenReturn(List.of(item));

        mockMvc.perform(get("/api/items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].name").value("Monitor"))
                .andExpect(jsonPath("$[0].price").value(399.99))
                .andExpect(jsonPath("$[0].category").value("Electronics"));
    }

    @Test
    void testGetOne() throws Exception {
        Item item = new Item("1", "Monitor", "4K UHD", 399.99, "Electronics", 10);
        when(service.getOne("1")).thenReturn(item);

        mockMvc.perform(get("/api/items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Monitor"))
                .andExpect(jsonPath("$.price").value(399.99));
    }

    @Test
    void testCreateItem() throws Exception {
        Item saved = new Item("1", "Headphones", "Noise Canceling", 199.99, "Audio", 15);
        when(service.create(any(Item.class))).thenReturn(saved);

        String json = "{\"name\":\"Headphones\",\"description\":\"Noise Canceling\",\"price\":199.99,\"category\":\"Audio\",\"quantity\":15}";

        mockMvc.perform(post("/api/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Headphones"))
                .andExpect(jsonPath("$.category").value("Audio"));
    }

    @Test
    void testUpdateItem() throws Exception {
        Item updated = new Item("1", "Headphones Pro", "ANC Pro", 249.99, "Audio", 20);
        when(service.update(eq("1"), any(Item.class))).thenReturn(updated);

        String json = "{\"name\":\"Headphones Pro\",\"description\":\"ANC Pro\",\"price\":249.99,\"category\":\"Audio\",\"quantity\":20}";

        mockMvc.perform(put("/api/items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Headphones Pro"))
                .andExpect(jsonPath("$.price").value(249.99));
    }

    @Test
    void testDeleteItem() throws Exception {
        doNothing().when(service).delete("1");

        mockMvc.perform(delete("/api/items/1"))
                .andExpect(status().isOk());
    }
}
