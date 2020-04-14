package COMP90082.team18.ePortfolioAPI.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import javax.persistence.*;
import java.util.Date;
import java.util.Map;

@Data
@Entity
public class Profile {
    @Id
    private Long id;

    @JsonFormat(pattern="dd-MM-yyyy")
    private Date birthday;

    private String phoneNumber;

    @OneToOne
    @MapsId
    private User user;

}

