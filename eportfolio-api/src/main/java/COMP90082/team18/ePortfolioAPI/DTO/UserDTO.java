package COMP90082.team18.ePortfolioAPI.DTO;

import COMP90082.team18.ePortfolioAPI.entity.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String username;
    private boolean admin;

    public UserDTO(User user) {
        id = user.getId();
        email = user.getEmail();
        username = user.getUsername();
        admin = user.isAdmin();
    }

    public User toUser() {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setUsername(username);
        user.setAdmin(admin);
        return user;
    }
}
