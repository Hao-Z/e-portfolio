package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.File;
import java.util.Date;

@Data
public class WorkExperienceDTO {
    private Long id;
    private String title;
    private String employmentType;
    private String companyName;
    private String location;
    private String industry;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date endDate;
    private String description;
    private File media;
}
