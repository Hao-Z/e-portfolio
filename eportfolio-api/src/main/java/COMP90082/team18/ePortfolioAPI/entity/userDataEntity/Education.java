package COMP90082.team18.ePortfolioAPI.entity.userDataEntity;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import COMP90082.team18.ePortfolioAPI.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Education extends GenericUserData {
    private String schoolName;
    private String degree;
    private String fieldOfStudy;
    private String grade;
    private LocalDate startYear;
    private LocalDate endYear;
    private String activityAndSociety;
    private String description;
    private File media;

    @OneToOne(mappedBy = "currentEducation")
    private User flagCurrentEducation;
}
