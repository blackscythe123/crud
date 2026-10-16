package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.model.CategoryAnalytics;
import com.example.library.service.LibraryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin
public class LibraryController {

    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(libraryService.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return libraryService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book savedBook = libraryService.addBook(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        libraryService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/analytics")
    public ResponseEntity<List<CategoryAnalytics>> getCategoryAnalytics() {
        return ResponseEntity.ok(libraryService.getCategoryAnalytics());
    }
    @PatchMapping("/{id}")
    public ResponseEntity<Book> patchBook(@PathVariable String id, @RequestBody Book patch) {
        return libraryService.patchBook(id, patch)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
