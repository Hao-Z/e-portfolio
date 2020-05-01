package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@MappedSuperclass
public abstract class GenericUserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;
}
