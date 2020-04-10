package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Result signUp(User user) {
        Result res = new Result();
        userRepository.save(user);
        return res;
    }

    public User getProfile(){
        return (User) userRepository.findAll();
    }
}
