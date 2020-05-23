package COMP90082.team18.ePortfolioAPI.entity.userDataEntity;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import COMP90082.team18.ePortfolioAPI.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class WorkExperience extends GenericUserData {
    private String title;
    private String employmentType;
    private String companyName;
    private String location;
    private String industry;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private File media;

    @OneToOne(mappedBy = "currentPosition")
    private User flagCurrentPosition;
}
