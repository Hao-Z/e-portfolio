package COMP90082.team18.ePortfolioAPI.security;

import COMP90082.team18.ePortfolioAPI.entity.User;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.*;

//source:
//https://spring.io/guides/gs/securing-web/

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        try {
            UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
            if (authentication != null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            chain.doFilter(req, res);
        } catch (JWTVerificationException e) {
            res.setStatus(HttpStatus.FORBIDDEN.value());
            res.getWriter().println(e.getMessage());
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String jwtToken = request.getHeader(JWT_HEADER_STRING);
        String sharedLink = request.getHeader(SHARED_LINK_HEADER_STRING);

        Object principal = null;
        Map<String, Object> credentials = new HashMap<>();
        Collection authorities = null;

        if (jwtToken != null) {
            User user = JWTMethod.parse(jwtToken);
            if (user != null) {
                principal = user.getId();
                authorities = user.isAdmin() ?
                        Collections.singletonList(new SimpleGrantedAuthority("ADMIN")) : new ArrayList<>();
            }
        }
        if (sharedLink != null) {
            credentials.put("read_only_id", JWTMethod.parseSharedLink(sharedLink));
        }

        if (principal != null || !credentials.isEmpty()) {
            return new UsernamePasswordAuthenticationToken(principal, credentials, authorities);
        }
        return null;
    }
}
