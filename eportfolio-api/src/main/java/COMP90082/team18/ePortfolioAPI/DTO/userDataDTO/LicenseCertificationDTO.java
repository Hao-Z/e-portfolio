package COMP90082.team18.ePortfolioAPI.DTO.userDataDTO;

import COMP90082.team18.ePortfolioAPI.DTO.DTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
public class LicenseCertificationDTO extends DTO {
    private Long id;
    private String name;
    private String issuingOrganization;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate issueDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate expirationDate;
    private String credentialID;
    private String credentialURL;
    private String media;
}
