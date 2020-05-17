package COMP90082.team18.ePortfolioAPI.entity.userDataEntity;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Skill extends GenericUserData {
    private String skillName;
}
