package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.IntroductionDTO;
import COMP90082.team18.ePortfolioAPI.DTO.ProfileDTO;
import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}/introduction")
public class IntroductionController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public Result<IntroductionDTO> getIntroduction(@PathVariable Long id){
        return profileService.getIntroduction(id);
    }

    @PatchMapping
    public Result<IntroductionDTO> patchIntroduction(@PathVariable Long id, @RequestBody IntroductionDTO introductionDTO){
        return profileService.patchIntroduction(id, modelMapper.map(introductionDTO, Profile.class));
    }
}
