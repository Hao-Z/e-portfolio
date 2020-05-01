package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
public class VolunteerExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String organizationName;
    private String role;
    private String cause;
    private Date startDate;
    private Date endDate;
    private String description;
    private File media;

    @ManyToOne
    private User user;
}
