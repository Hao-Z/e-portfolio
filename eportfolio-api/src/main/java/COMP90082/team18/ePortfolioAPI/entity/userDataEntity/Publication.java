package COMP90082.team18.ePortfolioAPI.entity.userDataEntity;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Publication extends GenericUserData {
    private String title;
    private String publicationPublisher;
    private LocalDate publicationDate;
    private String publicationURL;
    @Column(length = 2048)
    private String description;
    @Column(length = 2048)
    private String media;
}
