package COMP90082.team18.ePortfolioAPI.DTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserDTO extends DTO {
    private Long id;
    private String email;
    private String username;
    private boolean admin;
}
