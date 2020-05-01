package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String schoolName;
    private String degree;
    private String fieldOfStudy;
    private String grade;
    private boolean isDefault;
    private Date startYear;
    private Date endYear;
    private String activityAndSociety;
    private String description;
    private File media;

    @ManyToOne
    private User user;
}
