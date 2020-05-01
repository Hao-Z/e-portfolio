package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;

@Data
@Entity
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String referrerName;
    private String referrerTitle;
    private String description;
    private File media;

    @ManyToOne
    private User user;
}
