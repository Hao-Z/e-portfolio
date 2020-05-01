package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Project extends GenericUserData {
    private String projectName;
    private Date startDate;
    private Date endDate;
    private String projectURL;
    private String description;
    private File media;
}