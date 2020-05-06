package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import COMP90082.team18.ePortfolioAPI.util.ObjectMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NullPointerException("Profile not found."));
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public User patchUser(Long id, User user) {
        User originalUser = getUser(id);

        user.setId(id);
        user.setPassword(null);
        user.setAdmin(originalUser.isAdmin());

        return userRepository.save(ObjectMethod.update(originalUser, user));
    }
}
