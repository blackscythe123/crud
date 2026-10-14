package com.example.aggregation.controller;

import com.example.aggregation.model.CategoryAnalytics;
import com.example.aggregation.model.FilteredResult;
import com.example.aggregation.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {
    @Autowired
    private AnalyticsService service;

    @GetMapping("/total-by-category")
    public List<CategoryAnalytics> getTotalByCategory() {
        return service.getTotalByCategory();
    }

    @GetMapping("/filtered")
    public List<FilteredResult> getFiltered(@RequestParam(defaultValue = "0") double minPrice) {
        return service.getFiltered(minPrice);
    }
}
