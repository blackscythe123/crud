package com.example.aggregation.service;

import com.example.aggregation.dto.CategorySummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<CategorySummary> getCategorySummary() {
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.group("category")
                .sum("price").as("totalPrice")
                .avg("price").as("avgPrice")
                .sum("quantity").as("totalQuantity")
                .count().as("count"),
            Aggregation.project("totalPrice", "avgPrice", "totalQuantity", "count")
                .and("_id").as("category"),
            Aggregation.sort(Sort.Direction.DESC, "totalPrice")
        );
        AggregationResults<CategorySummary> results = mongoTemplate.aggregate(aggregation, "items", CategorySummary.class);
        return results.getMappedResults();
    }
}
