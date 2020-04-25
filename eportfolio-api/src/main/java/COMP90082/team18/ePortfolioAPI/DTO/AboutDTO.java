package COMP90082.team18.ePortfolioAPI.DTO;

import COMP90082.team18.ePortfolioAPI.entity.Profile;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AboutDTO {
    private String about;

    public AboutDTO(Profile profile){
        about = profile.getAbout();
    }

    public Profile toProfile(){
        Profile profile = new Profile();
        profile.setAbout(about);
        return profile;
    }
}
