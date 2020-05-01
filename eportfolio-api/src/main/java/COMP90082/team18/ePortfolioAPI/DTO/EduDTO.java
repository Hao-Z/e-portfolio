package COMP90082.team18.ePortfolioAPI.DTO;

import COMP90082.team18.ePortfolioAPI.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.ManyToOne;
import java.io.File;
import java.util.Date;

@Data
public class EduDTO {
    private Long id;
    private String schoolName;
    private String degree;
    private String fieldOfStudy;
    private String grade;
    private boolean isDefault;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startYear;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date endYear;
    private String activityAndSociety;
    private String description;
    private File media;

}
