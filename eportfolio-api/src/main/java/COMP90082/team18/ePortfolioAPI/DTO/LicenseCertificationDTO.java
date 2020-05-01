package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
public class LicenseCertificationDTO {
    private Long id;
    private String name;
    private String issuingOrganization;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date issueDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date expirationDate;
    private String credentialID;
    private String credentialURL;
    private File media;
}
