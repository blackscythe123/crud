# Complete Java Servlet Lab Exam Quick-Revision Guide
> **Subject:** Web Application Development (WAD) Laboratory  
> **Topic:** Java Servlets, Apache Tomcat, Directory Structure & Flow of Execution

---

## 1. The Core Architecture (What Actually Happens)

A **Servlet** is a server-side Java class that handles HTTP requests from a client (browser) and generates dynamic HTTP responses (HTML, JSON, etc.).

### The Servlet Lifecycle
The Servlet Container (Tomcat) manages the life of a servlet:
1. **`init()`**: Called **only once** when the servlet is first loaded into memory. Used for one-time initialization (e.g., opening database connections).
2. **`service(request, response)`**: Called on **every request**. Tomcat spawns a thread and delegates to `doGet()` or `doPost()` based on the HTTP method.
3. **`destroy()`**: Called **only once** when Tomcat shuts down or unloads the servlet. Cleans up resources.

```text
Browser Request  ──>  Tomcat Server  ──>  web.xml Lookup  ──>  Servlet.service()  ──>  doGet() / doPost()  ──>  HTML Response
```

---

## 2. The Golden Directory Structure

Every Java web application inside Tomcat's `webapps/` folder **must** follow this standardized layout:

```text
Tomcat/
└── webapps/
    └── YourAppName/             <── Context Root (Determines URL prefix!)
        │
        ├── index.html           <── Public files (HTML forms, CSS, JS)
        │
        └── WEB-INF/             <── PRIVATE (Hidden from direct browser access)
            │
            ├── web.xml          <── Deployment Descriptor (Maps URLs to Servlets)
            │
            ├── classes/         <── Compiled bytecode (.class files go here!)
            │   └── HelloServlet.class
            │
            └── lib/             <── Third-party JARs only (e.g. mysql-connector.jar)
                                     (NEVER put servlet-api.jar here!)
```

> [!IMPORTANT]
> - **Case sensitivity matters:** `WEB-INF` must be uppercase with a hyphen. `classes` and `lib` must be lowercase.
> - The folder name under `webapps/` (e.g., `YourAppName`) becomes the **Context Path** in your URL:  
>   `http://localhost:8080/YourAppName/`

---

## 3. How the URL is Constructed

```text
http://localhost:8080 / ServletFlow / hello
└─────── 1 ─────────┘   └─── 2 ───┘   └── 3 ──┘
   Server & Port        Context Path   Servlet Mapping
                       (Folder Name)     (web.xml)
```

1. **`http://localhost:8080/`** &rarr; Server hostname and HTTP port.
2. **`/ServletFlow/`** &rarr; The application folder name inside `webapps/`. (You never configure this in `web.xml`—Tomcat uses the directory name automatically).
3. **`/hello`** &rarr; The `<url-pattern>` defined in `web.xml`.

---

## 4. How to Trigger a Servlet: The 4 Lab Scenarios

### Key Rules to Memorize for Lab:
1. `<a href="...">` anchor tag **always sends a `GET` request** $\rightarrow$ Tomcat invokes `doGet()`.
2. Typing a URL directly into the browser address bar **always sends a `GET` request** $\rightarrow$ invokes `doGet()`.
3. `<form method="get">` sends data in the URL query string (`?username=Simiyon`) $\rightarrow$ invokes `doGet()`.
4. `<form method="post">` sends data secretly in HTTP body $\rightarrow$ invokes `doPost()`. If only `doGet()` is present, Tomcat throws **HTTP 405 Method Not Allowed**.

---

### Scenario 1: Anchor Link `<a>` (Just "Hello World", No Form)
**HTML (`index.html`):**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Click below to say hello:</h2>
    <!-- Clicking an anchor tag sends a GET request to http://localhost:8080/YourApp/hello -->
    <a href="hello">Say Hello World</a>
</body>
</html>
```

**Servlet (`HelloServlet.java`):**
```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello World!</h1>");
        out.println("</body></html>");
        out.close();
    }
}
```

---

### Scenario 2: Form with Submit Button (Just "Hello World", No Input Fields)
**HTML (`index.html`):**
```html
<!DOCTYPE html>
<html>
<body>
    <!-- Simple button trigger without any text boxes -->
    <form action="hello" method="get">
        <input type="submit" value="Display Hello World" />
    </form>
</body>
</html>
```
*Servlet is identical to Scenario 1 (`doGet` outputs `<h1>Hello World!</h1>`).*

---

### Scenario 3: Form using `GET` ("Hello Simiyon", Visible in URL)
**HTML (`index.html`):**
```html
<!DOCTYPE html>
<html>
<body>
    <form action="hello" method="get">
        Enter name: <input type="text" name="username" />
        <input type="submit" value="Submit" />
    </form>
</body>
</html>
```
*Browser URL after submission:* `http://localhost:8080/YourApp/hello?username=Simiyon`

**Servlet (`HelloServlet.java`):**
```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // Extracts 'username' from the URL query string (?username=...)
        String user = request.getParameter("username");

        out.println("<html><body>");
        out.println("<h2>Hello " + user + "!!</h2>");
        out.println("</body></html>");
        out.close();
    }
}
```

---

### Scenario 4: Form using `POST` ("Hello Simiyon", Hidden in Body)
**HTML (`index.html`):**
```html
<!DOCTYPE html>
<html>
<body>
    <!-- Notice method="post" -->
    <form action="hello" method="post">
        Enter name: <input type="text" name="username" />
        <input type="submit" value="Submit" />
    </form>
</body>
</html>
```
*Browser URL stays clean:* `http://localhost:8080/YourApp/hello` (parameters sent in HTTP body).

**Servlet (`HelloServlet.java`):**
```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {

    // 1. Primary logic handles form submissions with method="post"
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String user = request.getParameter("username");

        out.println("<html><body>");
        out.println("<h2>Hello " + user + " (received via POST)!!</h2>");
        out.println("</body></html>");
        out.close();
    }

    // 2. CRITICAL EXAM TRICK: Override doGet and call doPost!
    // Why? If someone types the URL directly in the browser bar or clicks an <a> link,
    // the browser sends a GET request. If you don't override doGet, Tomcat throws HTTP 405!
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }
}
```

#### Why override `doGet` and call `doPost`? (The HTTP 405 Shield)
| If your Servlet implements: | HTML has `method="get"` / `<a href>` | HTML has `method="post"` | Examiner types URL in browser bar |
| :--- | :---: | :---: | :---: |
| **Only `doGet()`** | Works ✅ | **Throws HTTP 405** ❌ | Works ✅ |
| **Only `doPost()`** | **Throws HTTP 405** ❌ | Works ✅ | **Throws HTTP 405** ❌ |
| **`doPost()` + call from `doGet()`** | Works ✅ | Works ✅ | Works ✅ |

---

### Pro-Tip: The Universal Servlet Pattern (Handles Both GET & POST Safely)
Forward `doGet` and `doPost` to a shared method so your servlet never throws HTTP 405 whether triggered by `<a href>`, `method="get"`, or `method="post"`:

```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        processRequest(req, resp);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String user = request.getParameter("username");
        if (user == null || user.trim().isEmpty()) {
            user = "World";
        }

        out.println("<html><body>");
        out.println("<h1>Hello " + user + "!</h1>");
        out.println("</body></html>");
        out.close();
    }
}
```

---

### C. The Deployment Descriptor (`web.xml`)
Placed in `webapps/YourAppName/WEB-INF/web.xml`.

```xml
<web-app>

    <!-- 1. Default Landing Page (Optional but good practice) -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>

    <!-- 2. Register the Java Servlet Class -->
    <servlet>
        <servlet-name>HelloAlias</servlet-name>
        <servlet-class>HelloServlet</servlet-class>
    </servlet>

    <!-- 3. Bind the URL to that Servlet -->
    <servlet-mapping>
        <servlet-name>HelloAlias</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>

</web-app>
```

#### Tag Glossary:
| Tag | Purpose |
| :--- | :--- |
| `<web-app>` | Root configuration tag. |
| `<welcome-file>` | Default page to serve if user visits `http://localhost:8080/YourApp/`. |
| `<servlet-name>` | Internal nickname / alias connecting `<servlet>` to `<servlet-mapping>`. |
| `<servlet-class>` | Exact compiled class name (e.g. `HelloServlet` or `com.HelloServlet`). |
| `<url-pattern>` | The browser URL path that triggers this servlet (must start with `/`). |

---

## 5. Compiling with `javac`

Because `javax.servlet.*` is not part of standard Java SE, you **must** supply Tomcat's `servlet-api.jar` using `-cp` (classpath), and specify the destination folder with `-d classes`:

### In Linux / Ubuntu:
```bash
cd /opt/tomcat/webapps/YourAppName/WEB-INF

# Relative compilation:
javac -cp "../../../lib/servlet-api.jar" -d classes HelloServlet.java
```

### In Windows PowerShell:
```powershell
cd C:\apache-tomcat-9.0.122\webapps\YourAppName\WEB-INF

javac -cp "..\..\..\lib\servlet-api.jar" -d classes HelloServlet.java
```

#### Flag Explanations:
- **`-cp`**: Points to `servlet-api.jar` where `HttpServlet` is defined.
- **`-d classes`**: Tells compiler to automatically put the generated `.class` inside `WEB-INF/classes/`.

---

## 6. Tomcat Commands: Windows vs Ubuntu Linux

| Action | Windows (PowerShell / CMD) | Ubuntu / Linux Terminal |
| :--- | :--- | :--- |
| **Set Tomcat Home** | `$env:CATALINA_HOME = "C:\apache-tomcat-9.0.122"` | `export CATALINA_HOME=$(pwd)` |
| **Set Java Home** | `$env:JAVA_HOME = "C:\Program Files\Java\..."` | `export JAVA_HOME=/usr/lib/jvm/default-java` |
| **Give Execute Rights** | *(Not needed)* | `chmod +x bin/*.sh` |
| **Start (Background)** | `bin\startup.bat` | `./bin/startup.sh` |
| **Start (Foreground / Logs)** | `bin\catalina.bat run` | `./bin/catalina.sh run` |
| **Stop Server** | `bin\shutdown.bat` | `./bin/shutdown.sh` *(or Ctrl + C)* |

### How to find `JAVA_HOME` on Ubuntu in the Lab:
If Tomcat says `JAVA_HOME is not defined correctly`, run this in terminal:
```bash
readlink -f $(which java)
```
If it prints `/usr/lib/jvm/java-17-openjdk-amd64/bin/java`, your `JAVA_HOME` is:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

---

## 7. Common Lab Errors & Instant Solutions

### 1. `HTTP Status 404 – Not Found`
- **Cause:** Typo in the folder name under `webapps/` or typo in `<url-pattern>`.
- **Fix:** Check that your URL matches `http://localhost:8080/<ExactFolderName>/<url-pattern>`.

### 2. `HTTP Status 405 – Method Not Allowed`
- **Cause:** Sent an HTTP method that your Servlet did not override (e.g. typing URL in browser sends `GET`, but Servlet only has `doPost`).
- **Fix:** Either submit via form `<form method="post">` OR implement `doGet` in the servlet.

### 3. `HTTP Status 500 – java.lang.ClassNotFoundException`
- **Cause:** `web.xml` `<servlet-class>` does not match where `.class` actually sits.
  - If `<servlet-class>com.HelloServlet</servlet-class>`, it MUST be inside `classes/com/HelloServlet.class`.
  - If class has no package, `<servlet-class>` must just be `HelloServlet`.

### 4. `package javax.servlet does not exist` during compilation
- **Cause:** Forgot `-cp` flag when running `javac`.
- **Fix:** Add `-cp "path/to/servlet-api.jar"`.

### 5. Code changes not showing in browser
- **Cause:** You edited `HelloServlet.java` but forgot to recompile! Tomcat runs bytecode, not `.java`.
- **Fix:** Run `javac` again, then refresh browser.

---

## 8. 30-Second Lab Walkthrough Checklist

1. Go to `tomcat/webapps/` &rarr; create `MyApp/WEB-INF/classes`.
2. In `MyApp/` &rarr; create `index.html` with `<form action="hello" method="post">`.
3. In `MyApp/WEB-INF/` &rarr; write `HelloServlet.java` extending `HttpServlet`.
4. Run `javac -cp "../../../lib/servlet-api.jar" -d classes HelloServlet.java`.
5. In `MyApp/WEB-INF/` &rarr; create `web.xml` mapping `<url-pattern>/hello</url-pattern>` to `<servlet-class>HelloServlet</servlet-class>`.
6. Start Tomcat (`./bin/startup.sh` or `startup.bat`).
7. Open browser &rarr; `http://localhost:8080/MyApp/` &rarr; submit form!
