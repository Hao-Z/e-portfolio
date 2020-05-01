package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String language;
    private String proficiency;

    @ManyToOne
    private User user;
}
