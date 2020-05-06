package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
public class EducationDTO extends DTO {
    private Long id;
    private String schoolName;
    private String degree;
    private String fieldOfStudy;
    private String grade;
    @JsonProperty("isDefault")
    private boolean isDefault;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startYear;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date endYear;
    private String activityAndSociety;
    private String description;
    private File media;

}
