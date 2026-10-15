import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class VoterServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("index.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String ageStr = request.getParameter("age");

        out.println("<html><head><title>Voting Eligibility Result</title></head><body>");

        try {
            int age = Integer.parseInt(ageStr.trim());

            out.println("<h2>Hello " + name.trim() + "</h2>");
            out.println("<p>Age: " + age + "</p>");

            if (age >= 18) {
                out.println("<h3 style='color:green;'>Eligible to vote</h3>");
            } else {
                out.println("<h3 style='color:red;'>Not able to vote</h3>");
            }
        } catch (Exception e) {
            out.println("<p style='color:red;'>Invalid input</p>");
        }

        out.println("<br><a href='index.html'>Back</a>");
        out.println("</body></html>");
    }
}
