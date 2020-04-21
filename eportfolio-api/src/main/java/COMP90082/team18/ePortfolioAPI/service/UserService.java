package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.security.JWTMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;

import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.HEADER_STRING;
import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.TOKEN_PREFIX;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Result<Object> signUp(User user, Result<Object> res, HttpServletResponse response) {
        if(checkUsername(user.getUsername())){
            userRepository.save(user);
            res.setMsg("200 ok");
            res.setSuccess(true);
            String token = JWTMethod.create(user);
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
        }
        else{
            res.setMsg("400 bad request; duplicated username");
            res.setSuccess(false);
            System.out.println("duplicated username");
        }
        return res;
    }

    public boolean checkUsername(String username){
        if(userRepository.findByUsername(username) == null)
            return true;
        else
            return false;
    }
}
