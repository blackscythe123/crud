package com.example.aggmockmvc.controller;

import com.example.aggmockmvc.model.CategoryAnalytics;
import com.example.aggmockmvc.model.FilteredResult;
import com.example.aggmockmvc.service.AnalyticsService;
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
