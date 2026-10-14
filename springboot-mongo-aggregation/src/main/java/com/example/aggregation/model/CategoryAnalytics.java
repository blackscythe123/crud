package com.example.aggregation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryAnalytics {
    private String category;
    private double totalPrice;
    private double avgPrice;
    private long count;
}
