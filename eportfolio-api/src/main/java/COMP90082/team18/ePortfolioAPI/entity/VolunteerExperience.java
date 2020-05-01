package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class VolunteerExperience extends GenericUserData {
    private String organizationName;
    private String role;
    private String cause;
    private Date startDate;
    private Date endDate;
    private String description;
    private File media;
}
