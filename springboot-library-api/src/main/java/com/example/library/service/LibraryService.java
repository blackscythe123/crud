package com.example.library.service;

import com.example.library.model.Book;
import com.example.library.model.CategoryAnalytics;
import com.example.library.repository.BookRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class LibraryService {

    private final BookRepository bookRepository;
    private final MongoTemplate mongoTemplate;

    public LibraryService(BookRepository bookRepository, MongoTemplate mongoTemplate) {
        this.bookRepository = bookRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(String id) {
        return bookRepository.findById(id);
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }

    public List<CategoryAnalytics> getCategoryAnalytics() {
        Aggregation aggregation = newAggregation(
                group("category")
                        .sum("totalCopies").as("totalCopies")
                        .avg("price").as("averagePrice"),
                project("totalCopies", "averagePrice")
                        .and("_id").as("category")
        );

        AggregationResults<CategoryAnalytics> results = mongoTemplate.aggregate(
                aggregation,
                "books",
                CategoryAnalytics.class
        );

        return results.getMappedResults();
    }
    public java.util.Optional<Book> patchBook(String id, Book patch) {
        return bookRepository.findById(id).map(existing -> {
            if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
            if (patch.getAuthor() != null) existing.setAuthor(patch.getAuthor());
            if (patch.getCategory() != null) existing.setCategory(patch.getCategory());
            if (patch.getPrice() != 0) existing.setPrice(patch.getPrice());
            if (patch.getTotalCopies() > 0) existing.setTotalCopies(patch.getTotalCopies());
            return bookRepository.save(existing);
        });
    }
}
