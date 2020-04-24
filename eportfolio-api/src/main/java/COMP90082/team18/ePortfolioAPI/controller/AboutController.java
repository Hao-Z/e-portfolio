package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.AboutDTO;
import COMP90082.team18.ePortfolioAPI.DTO.IntroductionDTO;
import COMP90082.team18.ePortfolioAPI.DTO.ProfileDTO;
import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}/about")
public class AboutController {
    @Autowired
    private ProfileService profileService;

    @GetMapping
    public Result<AboutDTO> getAbout(@PathVariable Long id){
        return profileService.getAbout(id);
    }

    @PatchMapping
    public Result<AboutDTO> patchAbout(@PathVariable Long id, @RequestBody AboutDTO aboutDTO){
        return profileService.patchAbout(id, aboutDTO.toProfile());
    }
}
