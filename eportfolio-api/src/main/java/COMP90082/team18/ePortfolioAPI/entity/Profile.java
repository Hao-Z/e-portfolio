package COMP90082.team18.ePortfolioAPI.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@Entity
public class Profile {
    @Id
    private Long id;

    private Date birthday;

    private String phoneNumber;

    @OneToOne
    @MapsId
    private User user;

}

