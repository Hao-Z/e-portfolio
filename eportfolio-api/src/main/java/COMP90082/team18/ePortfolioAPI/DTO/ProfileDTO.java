package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class ProfileDTO extends DTO {
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthday;
    private String phoneNumber;
}
