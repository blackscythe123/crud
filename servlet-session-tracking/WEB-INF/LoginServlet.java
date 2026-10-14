import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>Please submit the login form from <a href='index.html'>index.html</a></h2>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String role = request.getParameter("role");

        if (username == null || username.trim().isEmpty()) {
            response.sendRedirect("index.html");
            return;
        }

        HttpSession session = request.getSession(true);
        session.setAttribute("currentUser", username.trim());
        session.setAttribute("userRole", role != null ? role.trim() : "Student");
        session.setMaxInactiveInterval(1800);

        Cookie userCookie = new Cookie("lastUser", username.trim());
        userCookie.setMaxAge(60 * 60 * 24);
        response.addCookie(userCookie);

        String encodedRedirectURL = response.encodeRedirectURL("session-profile");
        response.sendRedirect(encodedRedirectURL);
    }
}
