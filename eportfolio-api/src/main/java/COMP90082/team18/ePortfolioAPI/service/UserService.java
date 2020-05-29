package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.DTO.PasswordDTO;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface UserService {
    User signUp(User user);

    boolean checkUsername(User user);

    Page<User> filterUsers(Integer page, Integer size, String[] industry, Integer[] gender, String orders, boolean ascending);

    List<Object> customizedFind(Long id, String name, int page, int size);

    User getUser(Long id);

    User patchUser(Long id, Map<String, Object> updateFields);

    void changePassword(Long id, PasswordDTO passwordDTO);

    String createSharedLink(Long time);

    void deleteUser(Long id);

}
