package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.entity.Result;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @GetMapping("/{id}")
    public Result<Object> getProfile(@PathVariable Long id){
        return profileService.getProfile(id);
    }

    @PutMapping("/{id}")
    public Result<Object> putProfile(@PathVariable Long id, @RequestBody Profile profile){
        return profileService.putProfile(id, profile);
    }

}
