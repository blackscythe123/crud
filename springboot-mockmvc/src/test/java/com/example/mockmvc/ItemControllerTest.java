package com.example.mockmvc;

import com.example.mockmvc.controller.ItemController;
import com.example.mockmvc.model.Item;
import com.example.mockmvc.service.ItemService;
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
        Item item = new Item("1", "Keyboard", "Mechanical Keyboard", 89.99);
        when(service.getAll()).thenReturn(List.of(item));

        mockMvc.perform(get("/api/items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].name").value("Keyboard"))
                .andExpect(jsonPath("$[0].description").value("Mechanical Keyboard"))
                .andExpect(jsonPath("$[0].price").value(89.99));
    }

    @Test
    void testGetOne() throws Exception {
        Item item = new Item("1", "Keyboard", "Mechanical Keyboard", 89.99);
        when(service.getOne("1")).thenReturn(item);

        mockMvc.perform(get("/api/items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Keyboard"))
                .andExpect(jsonPath("$.price").value(89.99));
    }

    @Test
    void testCreateItem() throws Exception {
        Item saved = new Item("1", "Mouse", "Wireless Mouse", 49.99);
        when(service.create(any(Item.class))).thenReturn(saved);

        String json = "{\"name\":\"Mouse\",\"description\":\"Wireless Mouse\",\"price\":49.99}";

        mockMvc.perform(post("/api/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Mouse"))
                .andExpect(jsonPath("$.price").value(49.99));
    }

    @Test
    void testUpdateItem() throws Exception {
        Item updated = new Item("1", "Pro Mouse", "Wireless Mouse", 59.99);
        when(service.update(eq("1"), any(Item.class))).thenReturn(updated);

        String json = "{\"name\":\"Pro Mouse\",\"description\":\"Wireless Mouse\",\"price\":59.99}";

        mockMvc.perform(put("/api/items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Pro Mouse"))
                .andExpect(jsonPath("$.price").value(59.99));
    }

    @Test
    void testDeleteItem() throws Exception {
        doNothing().when(service).delete("1");

        mockMvc.perform(delete("/api/items/1"))
                .andExpect(status().isOk());
    }
}
