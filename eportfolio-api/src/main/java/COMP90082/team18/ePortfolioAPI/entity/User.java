package COMP90082.team18.ePortfolioAPI.entity;

import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.Education;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.WorkExperience;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.File;
import java.time.LocalDate;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "email cannot be null")
    @Email(message = "email format not valid")
    private String email;

    @NotNull(message = "username cannot be null")
    @Size(min = 3, message = "wrong username size")
    @Column(unique = true, nullable = false)
    private String username;

    @NotNull(message = "password cannot be null")
    @Size(min = 6, message = "wrong password size")
    private String password;

    private boolean admin;

    private String firstName;
    private String lastName;
    private String headline;
    private String industry;
    private Gender gender;
    private LocalDate birthday;
    private String country;
    private String postalCode;
    private String address;
    private File profilePhoto;
    private String phoneNumber;
    private String summary;

    @OneToOne
    private WorkExperience currentPosition;
    @OneToOne
    private Education currentEducation;

//    @OneToMany(mappedBy = "user")
//    private List<WorkExperience> workExperiences;
//
//    @OneToMany(mappedBy = "user")
//    private List<Feature> features;
}
