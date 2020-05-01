package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
public class LicenseCertification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String issuingOrganization;
    private Date issueDate;
    private Date expirationDate;
    private String credentialID;
    private String credentialURL;
    private File media;

    @ManyToOne
    private User user;
}
