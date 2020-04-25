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

    public Profile update(Profile newProfile) {
        if(newProfile.getFirstName() != null) this.setFirstName(newProfile.getFirstName());
        if(newProfile.getLastName() != null) this.setLastName(newProfile.getLastName());
        if(newProfile.getHeadline() != null) this.setHeadline(newProfile.getHeadline());
        if(newProfile.getIndustry() != null) this.setIndustry(newProfile.getIndustry());
        if(newProfile.getCurrentPosition() != null) this.setCurrentPosition(newProfile.getCurrentPosition());
        if(newProfile.getCurrentEducation() != null) this.setCurrentEducation(newProfile.getCurrentEducation());
        if(newProfile.getGender() != null) this.setGender(newProfile.getGender());
        if(newProfile.getBirthday() != null) this.setBirthday(newProfile.getBirthday());
        if(newProfile.getCountry() != null) this.setCountry(newProfile.getCountry());
        if(newProfile.getPostalCode() != null) this.setPostalCode(newProfile.getPostalCode());
        if(newProfile.getAddress() != null) this.setAddress(newProfile.getAddress());
        if(newProfile.getProfilePhoto() != null) this.setProfilePhoto(newProfile.getProfilePhoto());
        if(newProfile.getPhoneNumber() != null) this.setPhoneNumber(newProfile.getPhoneNumber());
        if(newProfile.getAbout() != null) this.setAbout(newProfile.getAbout());
        return this;
    }
}

