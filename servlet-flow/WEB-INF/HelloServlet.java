/*
COMPILE FROM INSIDE WEB-INF DIRECTORY:
Linux:   javac -cp "../../../lib/*" -d classes HelloServlet.java
Windows: javac -cp "../../../lib/*" -d classes HelloServlet.java

RUN TOMCAT:
Linux:   ../../../bin/startup.sh
Windows: ..\..\..\bin\startup.bat

URL:
http://localhost:8080/servlet-flow/index.html
*/

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {
    @Override 
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        String name = request.getParameter("name");
        response.setContentType("text/html");
        PrintWriter pw = response.getWriter();
        pw.println("<h3>Hello " + name + "!!</h3>");
        pw.close();
    }

    @Override 
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        doPost(request, response);
    }
}