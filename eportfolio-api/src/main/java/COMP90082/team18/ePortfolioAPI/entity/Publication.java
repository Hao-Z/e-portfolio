package COMP90082.team18.ePortfolioAPI.entity;

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
    private String description;
    private File media;
}
