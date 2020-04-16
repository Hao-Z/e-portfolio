package COMP90082.team18.ePortfolioAPI.DTO;

import COMP90082.team18.ePortfolioAPI.entity.Profile;
import lombok.Data;

import java.util.Date;

@Data
public class ProfileDTO {
    private Date birthday;
    private String phoneNumber;
    private UserDTO userDTO;

    public ProfileDTO(Profile profile){
        birthday = profile.getBirthday();
        phoneNumber = profile.getPhoneNumber();
        userDTO = new UserDTO(profile.getUser());
    }

    public Profile toProfile(){
        Profile profile = new Profile();
        profile.setBirthday(birthday);
        profile.setPhoneNumber(phoneNumber);
        profile.setUser(userDTO.toUser());
        return profile;
    }
}
