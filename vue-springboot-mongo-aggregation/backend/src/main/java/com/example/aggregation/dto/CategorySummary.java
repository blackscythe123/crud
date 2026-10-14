package com.example.aggregation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategorySummary {
    private String category;
    private double totalPrice;
    private double avgPrice;
    private int totalQuantity;
    private long count;
}
