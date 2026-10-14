import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class ProfileServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("currentUser") == null) {
            out.println("<html><body>");
            out.println("<h3 style='color:red;'>Access Denied. No active session found.</h3>");
            out.println("<a href='index.html'>Click here to Login</a>");
            out.println("</body></html>");
            return;
        }

        String username = (String) session.getAttribute("currentUser");
        String role = (String) session.getAttribute("userRole");
        String sessionId = session.getId();
        Date creationTime = new Date(session.getCreationTime());
        Date lastAccessed = new Date(session.getLastAccessedTime());

        String lastUserCookieVal = "None";
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("lastUser".equals(c.getName())) {
                    lastUserCookieVal = c.getValue();
                    break;
                }
            }
        }

        String logoutURLWithRewriting = response.encodeURL("session-logout");

        out.println("<html><head><title>User Profile</title></head><body>");
        out.println("<h2>Welcome, " + username + "!</h2>");
        out.println("<fieldset>");
        out.println("<legend>HttpSession Details</legend>");
        out.println("<p><strong>Username:</strong> " + username + "</p>");
        out.println("<p><strong>Assigned Role:</strong> " + role + "</p>");
        out.println("<p><strong>Session ID:</strong> " + sessionId + "</p>");
        out.println("<p><strong>Session Creation Time:</strong> " + creationTime + "</p>");
        out.println("<p><strong>Last Accessed Time:</strong> " + lastAccessed + "</p>");
        out.println("</fieldset>");

        out.println("<br>");

        out.println("<fieldset>");
        out.println("<legend>Cookie Details</legend>");
        out.println("<p><strong>Cookie 'lastUser':</strong> " + lastUserCookieVal + "</p>");
        out.println("</fieldset>");

        out.println("<br>");

        out.println("<fieldset>");
        out.println("<legend>URL Rewriting & Navigation</legend>");
        out.println("<p><a href='" + logoutURLWithRewriting + "'>Logout (via URL Rewritten Link)</a></p>");
        out.println("<p><a href='index.html'>Return to Home Form</a></p>");
        out.println("</fieldset>");

        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
