package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.DTO.PasswordDTO;
import COMP90082.team18.ePortfolioAPI.DTO.UserDTO;
import COMP90082.team18.ePortfolioAPI.DTO.UserProjection;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    User signUp(User user);

    boolean checkUsername(User user);

    List<Object> customizedFind(Long id, String name, int page, int size);

    User getUser(Long id);

    User patchUser(Long id, User user);

    void changePassword(Long id, PasswordDTO passwordDTO);
}
