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
public class VolunteerExperience extends GenericUserData {
    private String organizationName;
    private String role;
    private String cause;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private File media;
}
