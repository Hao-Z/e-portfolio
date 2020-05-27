package COMP90082.team18.ePortfolioAPI.entity.userDataEntity;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Feature extends GenericUserData {
    private String title;
    private String link;
    @Column(length = 2048)
    private String media;
}
