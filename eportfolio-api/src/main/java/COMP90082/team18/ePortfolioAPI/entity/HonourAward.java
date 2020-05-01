package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class HonourAward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String associatedWith;
    private String issuer;
    private Date issueDate;
    private String description;

    @ManyToOne
    private User user;
}
