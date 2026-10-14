package com.example.library.model;

public class CategoryAnalytics {

    private String category;
    private int totalCopies;
    private double averagePrice;

    public CategoryAnalytics() {
    }

    public CategoryAnalytics(String category, int totalCopies, double averagePrice) {
        this.category = category;
        this.totalCopies = totalCopies;
        this.averagePrice = averagePrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }
}
