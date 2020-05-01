package COMP90082.team18.ePortfolioAPI.DTO;

import lombok.Data;

import java.io.File;

@Data
public class FeatureDTO extends DTO {
    private Long id;
    private String link;
    private File media;
}
