package COMP90082.team18.ePortfolioAPI.DTO.userDataDTO;

import COMP90082.team18.ePortfolioAPI.DTO.DTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
public class WorkExperienceDTO extends DTO {
    private Long id;
    private String title;
    private String employmentType;
    private String companyName;
    private String location;
    private String industry;
    @JsonProperty("isCurrentWork")
    private boolean isDefault;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;
    private String description;
    private File media;
}
