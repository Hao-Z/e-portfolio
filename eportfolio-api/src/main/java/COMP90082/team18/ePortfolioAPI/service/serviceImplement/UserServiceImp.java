package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.DTO.UserDTO;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import COMP90082.team18.ePortfolioAPI.util.CustomizedSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import COMP90082.team18.ePortfolioAPI.DTO.PasswordDTO;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import COMP90082.team18.ePortfolioAPI.util.ObjectMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User signUp(User user) {
        if (checkUsername(user)) {
            return userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Duplicate username.");
        }
    }

    public boolean checkUsername(User user) {
        return userRepository.findByUsername(user.getUsername()) == null;
    }


    public Page<User> customizedFind(Long id, String name, int page, int size) {
        Specification<User> spec = new CustomizedSpecification<>("id", ">", id);

        return userRepository.findCustomized(Specification.where(spec), PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "id")));

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

    @Override
    public void changePassword(Long id, PasswordDTO passwordDTO) {
        User targetUser = getUser(id);
        if (bCryptPasswordEncoder.matches(passwordDTO.getCurrentPassword(), targetUser.getPassword())) {
            targetUser.setPassword(passwordDTO.getNewPassword());
            userRepository.save(targetUser);
        } else throw new AccessDeniedException("Wrong password.");
    }
}
