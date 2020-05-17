package COMP90082.team18.ePortfolioAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
public class PublicationDTO extends DTO {
    private Long id;
    private String title;
    private String publicationPublisher;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate publicationDate;
    private String publicationURL;
    private String description;
    private File media;
}
