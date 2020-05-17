package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class HonourAward extends GenericUserData{
    private String title;
    private String associatedWith;
    private String issuer;
    private LocalDate issueDate;
    private String description;
}
