package com.example.aggregation.controller;

import com.example.aggregation.dto.CategorySummary;
import com.example.aggregation.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {
    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/category-summary")
    public List<CategorySummary> getCategorySummary() {
        return analyticsService.getCategorySummary();
    }
}
