package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    public User signUp(User user) {
        if(checkUsername(user)){
            return userRepository.save(user);
        } else{
            throw new IllegalArgumentException("Duplicate username.");
        }
    }

    public boolean checkUsername(User user){
        return userRepository.findByUsername(user.getUsername()) == null;
    }
}
