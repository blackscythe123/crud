import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JdbcItemServlet extends HttpServlet {

    private Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "root", "root");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html><body>");
        out.println("<h2>Items in Database</h2>");
        out.println("<table border='1' cellpadding='6'>");
        out.println("<tr><th>ID</th><th>Name</th><th>Description</th><th>Price</th></tr>");

        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM items");
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                out.println("<tr>");
                out.println("<td>" + rs.getInt("id") + "</td>");
                out.println("<td>" + rs.getString("name") + "</td>");
                out.println("<td>" + rs.getString("description") + "</td>");
                out.println("<td>" + rs.getDouble("price") + "</td>");
                out.println("</tr>");
            }
        } catch (Exception e) {
            out.println("<p>Error: " + e.getMessage() + "</p>");
        }

        out.println("</table><br>");
        out.println("<a href='index.html'>Back to Form</a>");
        out.println("</body></html>");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");

        try (Connection con = getConnection()) {
            if ("insert".equals(action)) {
                String name = request.getParameter("name");
                String description = request.getParameter("description");
                double price = Double.parseDouble(request.getParameter("price"));

                String sql = "INSERT INTO items (name, description, price) VALUES (?, ?, ?)";
                try (PreparedStatement ps = con.prepareStatement(sql)) {
                    ps.setString(1, name);
                    ps.setString(2, description);
                    ps.setDouble(3, price);
                    ps.executeUpdate();
                }
                out.println("<h2>Inserted Successfully</h2>");
            } else if ("delete".equals(action)) {
                int id = Integer.parseInt(request.getParameter("id"));
                String sql = "DELETE FROM items WHERE id = ?";
                try (PreparedStatement ps = con.prepareStatement(sql)) {
                    ps.setInt(1, id);
                    ps.executeUpdate();
                }
                out.println("<h2>Deleted Successfully</h2>");
            }
        } catch (Exception e) {
            out.println("<h2>Database Error: " + e.getMessage() + "</h2>");
        }

        out.println("<br><a href='index.html'>Back to Form</a> | <a href='jdbc-item'>View All Items</a>");
    }
}
