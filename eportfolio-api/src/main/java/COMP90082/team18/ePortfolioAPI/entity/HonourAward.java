package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class HonourAward extends GenericUserData{
    private String title;
    private String associatedWith;
    private String issuer;
    private Date issueDate;
    private String description;
}
