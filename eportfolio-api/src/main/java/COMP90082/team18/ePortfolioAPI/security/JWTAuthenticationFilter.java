package COMP90082.team18.ePortfolioAPI.security;

import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.*;
import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.TOKEN_PREFIX;

//source:
//https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            User creds = new ObjectMapper()
                    .readValue(req.getInputStream(), User.class);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse resp, FilterChain chain,
                                            Authentication auth) throws IOException {
        String token = JWTMethod.create(auth);
        resp.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
        resp.addHeader("Access-Control-Expose-Headers", "Authorization");
        Result<Object> res = new Result<>();
        res.setSuccess(true);
        res.setMsg("200 ok");
        PrintWriter pw = resp.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(res));
        pw.flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest req, HttpServletResponse resp,
                                              AuthenticationException failed) throws IOException {
        Result<Object> res = new Result<>();
        res.setSuccess(false);
        res.setMsg("400 err, Wrong Username or Password");
        PrintWriter pw = resp.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(res));
        pw.flush();
    }
}
