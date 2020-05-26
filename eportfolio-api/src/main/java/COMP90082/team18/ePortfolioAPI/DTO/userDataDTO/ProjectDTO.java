package COMP90082.team18.ePortfolioAPI.DTO.userDataDTO;

import COMP90082.team18.ePortfolioAPI.DTO.DTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
public class ProjectDTO extends DTO {
    private Long id;
    private String projectName;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;
    private String projectURL;
    private String description;
    private String media;
}
