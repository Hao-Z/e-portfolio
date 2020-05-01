package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String publicationPublisher;
    private Date publicationDate;
    private String publicationURL;
    private String description;
    private File media;

    @ManyToOne
    private User user;
}
