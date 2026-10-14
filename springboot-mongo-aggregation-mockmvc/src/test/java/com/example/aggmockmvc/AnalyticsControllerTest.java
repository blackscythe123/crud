package com.example.aggmockmvc;

import com.example.aggmockmvc.controller.AnalyticsController;
import com.example.aggmockmvc.model.CategoryAnalytics;
import com.example.aggmockmvc.model.FilteredResult;
import com.example.aggmockmvc.service.AnalyticsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AnalyticsController.class)
class AnalyticsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AnalyticsService service;

    @Test
    void testTotalByCategory() throws Exception {
        CategoryAnalytics analytics = new CategoryAnalytics("Electronics", 1500.0, 500.0, 3);
        when(service.getTotalByCategory()).thenReturn(List.of(analytics));

        mockMvc.perform(get("/api/analytics/total-by-category"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].category").value("Electronics"))
                .andExpect(jsonPath("$[0].totalPrice").value(1500.0))
                .andExpect(jsonPath("$[0].avgPrice").value(500.0))
                .andExpect(jsonPath("$[0].count").value(3));
    }

    @Test
    void testFiltered() throws Exception {
        FilteredResult filtered = new FilteredResult("Electronics", 2);
        when(service.getFiltered(100.0)).thenReturn(List.of(filtered));

        mockMvc.perform(get("/api/analytics/filtered").param("minPrice", "100.0"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].category").value("Electronics"))
                .andExpect(jsonPath("$[0].count").value(2));
    }
}
