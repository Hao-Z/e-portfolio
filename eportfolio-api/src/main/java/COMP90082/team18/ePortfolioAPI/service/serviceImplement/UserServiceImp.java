package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.DTO.IntroductionDTO;
import COMP90082.team18.ePortfolioAPI.DTO.UserDTO;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.security.JWTMethod;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import COMP90082.team18.ePortfolioAPI.util.CustomizedSpecification;
import org.hibernate.query.internal.NativeQueryImpl;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import COMP90082.team18.ePortfolioAPI.DTO.PasswordDTO;
import COMP90082.team18.ePortfolioAPI.util.ObjectMethod;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

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

    public Page<User> filterUsers(int page, int size, @Nullable String[] industry, @Nullable String order) {
        Specification<User> spec = null;

        if(industry != null){
            for(String item : industry) {
                Specification<User> s = new CustomizedSpecification<>("industry", "=", item);
                if (spec == null) spec = s;
                else spec = spec.or(s);
            }
        }
        Page<User> result = (order == null) ? userRepository.findAll(spec, PageRequest.of(page, size)) :
                userRepository.findAll(spec, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, order)));

        return result;
    }

    public List<Object> customizedFind(Long id, String name, int page, int size) {
//        Query q = em.createNativeQuery("select email as email, username as usersdf, admin as adm, degree as deg " +
//                "from user join education on user.id = education.user_id");
//
//        q.unwrap(NativeQueryImpl.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
//
//        List<Object> res = q.getResultList();
//
//        return res;
        return null;
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

    @Override
    public void changePassword(Long id, PasswordDTO passwordDTO) {
        User targetUser = getUser(id);
        if (bCryptPasswordEncoder.matches(passwordDTO.getCurrentPassword(), targetUser.getPassword())) {
            targetUser.setPassword(passwordDTO.getNewPassword());
            userRepository.save(targetUser);
        } else throw new AccessDeniedException("Wrong password.");
    }

    @Override
    public String createSharedLink() {
        return JWTMethod.createSharedLink((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
