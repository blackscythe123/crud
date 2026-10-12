# Fullstack CRUD Starter Template (Spring Boot + MongoDB + Vue.js)

A production-ready, clean, plug-and-play template for fullstack CRUD applications.

## Architecture

- **Backend:** Spring Boot (Java 21, Maven), Spring Data MongoDB, Lombok, Spring Web
- **Frontend:** Vue.js 3 (Composition API / `<script setup>`), Vite, Axios
- **Database:** MongoDB (`mongodb://localhost:27017/my_crud_db`)

---

## Quick Start

### 1. Run the Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```
Backend will start on: **`http://localhost:8080`**  
REST Endpoint: **`http://localhost:8080/api/items`**

### 2. Run the Frontend (Vue.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on: **`http://localhost:5173`**

---

## How to Customize for Any Exam / Requirement in 2 Minutes

If your question asks for **Student**, **Product**, **Employee**, etc.:

1. **Backend (`backend/src/main/java/com/example/crud/`):**
   - Rename `model/Item.java` to `model/Student.java` and change fields (e.g. `name`, `email`, `department`).
   - Rename `repository/ItemRepository.java` to `repository/StudentRepository.java`.
   - Update `service/ItemService.java` to use the new entity and repository.
   - Update `controller/ItemController.java` mapping to `@RequestMapping("/api/students")`.

2. **Frontend (`frontend/src/`):**
   - In `services/ItemService.js`, update `API_URL` to `http://localhost:8080/api/students`.
   - In `App.vue`, update form inputs, table headers, and fields to match your entity properties.
