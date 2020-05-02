package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
public class VolunteerExperienceDTO {
    private String organizationName;
    private String role;
    private String cause;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date endDate;
    private String description;
    private File media;
}
