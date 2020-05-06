package COMP90082.team18.ePortfolioAPI.DTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class PasswordDTO extends DTO {
    private String currentPassword;
    private String newPassword;
}
