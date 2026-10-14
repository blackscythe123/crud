import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ItemServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html><body>");
        out.println("<h2>GET Request Received</h2>");
        out.println("Parameter name: " + request.getParameter("name") + "<br>");
        out.println("Parameter description: " + request.getParameter("description") + "<br>");
        out.println("Parameter price: " + request.getParameter("price") + "<br><br>");
        out.println("<a href='index.html'>Back to Form</a>");
        out.println("</body></html>");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String description = request.getParameter("description");
        String price = request.getParameter("price");

        out.println("<html><body>");
        out.println("<h2>POST Request Processed</h2>");
        out.println("Name: " + name + "<br>");
        out.println("Description: " + description + "<br>");
        out.println("Price: " + price + "<br><br>");
        out.println("<a href='index.html'>Back to Form</a>");
        out.println("</body></html>");
    }
}
