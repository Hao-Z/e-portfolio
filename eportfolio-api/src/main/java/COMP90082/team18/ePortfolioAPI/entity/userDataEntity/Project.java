package COMP90082.team18.ePortfolioAPI.entity.userDataEntity;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Project extends GenericUserData {
    private String projectName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String projectURL;
    private String description;
    private File media;
}
