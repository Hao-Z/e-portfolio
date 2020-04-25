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
    @JsonProperty("user")
    private UserDTO userDTO;

    public IntroductionDTO(Profile profile) {
        firstName = profile.getFirstName();
        lastName = profile.getLastName();
        headline = profile.getHeadline();
        industry = profile.getIndustry();
        currentPosition = profile.getCurrentPosition();
        currentEducation = profile.getCurrentEducation();
        gender = profile.getGender();
        birthday = profile.getBirthday();
        country = profile.getCountry();
        postalCode = profile.getPostalCode();
        address = profile.getAddress();
        profilePhoto = profile.getProfilePhoto();
        phoneNumber = profile.getPhoneNumber();
        userDTO = new UserDTO(profile.getUser());
    }

    public Profile toProfile() {
        Profile profile = new Profile();
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setHeadline(headline);
        profile.setIndustry(industry);
        profile.setCurrentPosition(currentPosition);
        profile.setCurrentEducation(currentEducation);
        profile.setGender(gender);
        profile.setBirthday(birthday);
        profile.setCountry(country);
        profile.setPostalCode(postalCode);
        profile.setAddress(address);
        profile.setProfilePhoto(profilePhoto);
        profile.setPhoneNumber(phoneNumber);
        profile.setUser(userDTO == null ? null : userDTO.toUser());
        return profile;
    }
}
