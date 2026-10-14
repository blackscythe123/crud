package com.example.aggregation.service;

import com.example.aggregation.model.CategoryAnalytics;
import com.example.aggregation.model.FilteredResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<CategoryAnalytics> getTotalByCategory() {
        Aggregation agg = Aggregation.newAggregation(
                Aggregation.group("category")
                        .sum("price").as("totalPrice")
                        .avg("price").as("avgPrice")
                        .count().as("count"),
                Aggregation.project("totalPrice", "avgPrice", "count").and("_id").as("category"),
                Aggregation.sort(Sort.Direction.DESC, "totalPrice")
        );
        return mongoTemplate.aggregate(agg, "items", CategoryAnalytics.class).getMappedResults();
    }

    public List<FilteredResult> getFiltered(double minPrice) {
        Aggregation agg = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("price").gt(minPrice)),
                Aggregation.group("category").count().as("count"),
                Aggregation.project("count").and("_id").as("category"),
                Aggregation.sort(Sort.Direction.DESC, "count")
        );
        return mongoTemplate.aggregate(agg, "items", FilteredResult.class).getMappedResults();
    }
}
