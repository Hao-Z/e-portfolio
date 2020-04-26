package COMP90082.team18.ePortfolioAPI.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;
import java.util.Date;

@Data
@Entity
public class Profile {
    @Id
    private Long id;

    private String firstName;

    private String lastName;

    private String headline;

    private String industry;

    private String currentPosition;

    private String currentEducation;

    private Gender gender;

    private Date birthday;

    private String country;

    private String postalCode;

    private String address;

    private File profilePhoto;

    private String phoneNumber;

    private String about;

    @OneToOne
    @MapsId
    private User user;

}

