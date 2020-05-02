package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class LicenseCertification extends GenericUserData {
    private String name;
    private String issuingOrganization;
    private Date issueDate;
    private Date expirationDate;
    private String credentialID;
    private String credentialURL;
    private File media;

}
