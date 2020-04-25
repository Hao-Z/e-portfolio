package COMP90082.team18.ePortfolioAPI.DTO;

import COMP90082.team18.ePortfolioAPI.entity.Profile;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class ProfileDTO {
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date birthday;
    private String phoneNumber;

    public ProfileDTO(Profile profile) {
        birthday = profile.getBirthday();
        phoneNumber = profile.getPhoneNumber();
    }

    public Profile toProfile() {
        Profile profile = new Profile();
        profile.setBirthday(birthday);
        profile.setPhoneNumber(phoneNumber);
        return profile;
    }
}
