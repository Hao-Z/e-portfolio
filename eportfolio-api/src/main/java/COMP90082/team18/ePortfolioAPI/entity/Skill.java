package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillName;

    @ManyToOne
    private User user;
}
