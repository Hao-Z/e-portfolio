package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.ProfileDTO;
import COMP90082.team18.ePortfolioAPI.entity.Result;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @GetMapping("/{id}")
    public Result<Object> getProfile(@PathVariable Long id){
        return profileService.getProfile(id);
    }

    @PatchMapping("/{id}")
    public Result<Object> patchProfile(@PathVariable Long id, @RequestBody ProfileDTO profileDTO){
        return profileService.patchProfile(id, profileDTO.toProfile());
    }

}
