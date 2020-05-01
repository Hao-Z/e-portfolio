package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
public class ProfileDTO extends DTO {
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthday;
    private String phoneNumber;
}
