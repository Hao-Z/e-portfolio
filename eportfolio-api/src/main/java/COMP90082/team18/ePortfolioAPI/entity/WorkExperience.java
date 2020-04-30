package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
public class WorkExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String employmentType;
    private String companyName;
    private String location;
    private String industry;
    private Date startDate;
    private Date endDate;
    private String description;
    private File media;

    @ManyToOne
    private User user;
}
