package COMP90082.team18.ePortfolioAPI.DTO;

import COMP90082.team18.ePortfolioAPI.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String username;

    public UserDTO(User user){
        id =user.getId();
        email = user.getEmail();
        username = user.getUsername();
    }

    public User toUser(){
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setUsername(username);
        return user;
    }
}
