# Web Application Development (WAD) Lab & Starter Templates

A fullstack starter kit and reference repository containing ready-to-run templates for **Spring Boot + MongoDB + Vue 3** fullstack CRUD and **Apache Tomcat 9 Java Servlet** workflows.

---

## Repository Structure

```
.
├── backend/            # Spring Boot REST API (Java 21, Maven, Spring Data MongoDB)
├── frontend/           # Vue 3 Frontend (Vite, Axios, minimal composition setup)
├── servlet-flow/       # Java Servlet Tomcat 9 setup (web.xml, HelloServlet, HTML)
└── README.md
```

---

## 1. Fullstack CRUD (Spring Boot + MongoDB + Vue.js)

### Tech Stack
- **Backend:** Spring Boot, Spring Data MongoDB, Lombok, Spring Web MVC
- **Database:** MongoDB (`mongodb://localhost:27017/my_crud_db`)
- **Frontend:** Vue 3 (`<script setup>`, Composition API), Vite, Axios

### Running the Backend
```bash
cd backend
./mvnw spring-boot:run
```
- API Base URL: `http://localhost:8080/api/items`
- Ports: `8080` (Spring Boot), `27017` (MongoDB)

### API Endpoints
| HTTP Method | Route | Description |
|:---|:---|:---|
| `GET` | `/api/items` | Retrieve all items |
| `GET` | `/api/items/{id}` | Retrieve single item by ID |
| `POST` | `/api/items` | Create a new item |
| `PUT` | `/api/items/{id}` | Update existing item |
| `DELETE` | `/api/items/{id}` | Delete item by ID |

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
- Dev Server: `http://localhost:5173`

### Quick Adaptation for Different Entities
To convert `Item` into another entity (e.g., `Student`, `Product`, `Task`):
1. **Model:** Rename/edit `backend/src/main/java/com/example/crud/model/Item.java` and adjust fields.
2. **Repository:** Update `ItemRepository.java` generics to match the entity.
3. **Service & Controller:** Update method signatures and `@RequestMapping` path in `ItemService.java` & `ItemController.java`.
4. **Frontend:** Adjust payload fields in `frontend/src/App.vue` and endpoint URL in `frontend/src/services/ItemService.js`.

---

## 2. Java Servlet Project (`servlet-flow/`)

A standalone Apache Tomcat 9 deployment descriptor pattern for servlet execution and parameter handling.

### Directory Layout
```
servlet-flow/
├── index.html
├── SERVLET_EXAM_CHEATSHEET.md
└── WEB-INF/
    ├── web.xml
    └── HelloServlet.java
```

### Key Highlights
- **Deployment Descriptor (`web.xml`):** Configures `<servlet>`, `<servlet-mapping>`, and `<welcome-file-list>`.
- **Handling GET vs POST:** Demonstrates `doGet()` handling for anchor tags and URL parameters alongside `doPost()` form handling.
- **Cheatsheet:** Detailed guide in [`servlet-flow/SERVLET_EXAM_CHEATSHEET.md`](servlet-flow/SERVLET_EXAM_CHEATSHEET.md) covering compilation via `javac`, common status codes (`404`, `405`, `500`), and Linux/Ubuntu vs Windows commands.

---

## Quick Download via cURL

To download and extract this entire repository as a `.zip` archive:

```bash
# Download
curl -L -o crud.zip "https://github.com/blackscythe123/crud/archive/refs/heads/main.zip"

# Linux / macOS
unzip crud.zip && cd crud-main

# Windows PowerShell
Expand-Archive -Path crud.zip -DestinationPath . ; cd crud-main
```
