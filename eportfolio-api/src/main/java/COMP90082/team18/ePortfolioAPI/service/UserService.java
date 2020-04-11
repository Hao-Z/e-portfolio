package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.security.JWTMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;

import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.HEADER_STRING;
import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.TOKEN_PREFIX;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Result signUp(User user, HttpServletResponse response) {
        Result res = new Result();

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        String token = JWTMethod.create(user.getUsername());
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);

        return res;
    }

    public User getProfile(){
        return (User) userRepository.findAll();
    }
}
