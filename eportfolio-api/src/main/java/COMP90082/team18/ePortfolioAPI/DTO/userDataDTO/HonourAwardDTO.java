package COMP90082.team18.ePortfolioAPI.DTO.userDataDTO;

import COMP90082.team18.ePortfolioAPI.DTO.DTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
public class HonourAwardDTO extends DTO {
    private Long id;
    private String title;
    private String associatedWith;
    private String issuer;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate issueDate;
    private String description;
}
