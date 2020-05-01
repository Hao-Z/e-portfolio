package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class WorkExperience extends GenericUserData {
    private String title;
    private String employmentType;
    private String companyName;
    private String location;
    private String industry;
    private Date startDate;
    private Date endDate;
    private String description;
    private File media;
}
