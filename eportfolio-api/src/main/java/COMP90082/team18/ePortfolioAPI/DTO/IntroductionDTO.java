package COMP90082.team18.ePortfolioAPI.DTO;

import COMP90082.team18.ePortfolioAPI.entity.Gender;
import COMP90082.team18.ePortfolioAPI.entity.Profile;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.util.Date;

@Data
@RequiredArgsConstructor
public class IntroductionDTO {
    private String firstName;
    private String lastName;
    private String headline;
    private String industry;
    private String currentPosition;
    private String currentEducation;
    private Gender gender;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthday;
    private String country;
    private String postalCode;
    private String address;
    private File profilePhoto;
    private String phoneNumber;
}