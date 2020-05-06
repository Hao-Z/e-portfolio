package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Education extends GenericUserData {
    private String schoolName;
    private String degree;
    private String fieldOfStudy;
    private String grade;
    private Date startYear;
    private Date endYear;
    private String activityAndSociety;
    private String description;
    private File media;
}
