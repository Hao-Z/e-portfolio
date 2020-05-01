package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.File;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Feature extends GenericUserData{
    private String link;
    private File media;
}
