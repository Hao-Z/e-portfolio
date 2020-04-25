package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class ProfileDTO {
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthday;
    private String phoneNumber;
}
