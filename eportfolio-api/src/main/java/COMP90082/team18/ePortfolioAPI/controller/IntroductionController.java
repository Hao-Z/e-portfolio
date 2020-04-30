package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.IntroductionDTO;
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
    public IntroductionDTO getIntroduction(@PathVariable Long id){
        return modelMapper.map(profileService.getProfile(id), IntroductionDTO.class);
    }

    @PatchMapping
    public IntroductionDTO patchIntroduction(@PathVariable Long id, @RequestBody IntroductionDTO introductionDTO){
        Profile result = profileService.patchProfile(id, modelMapper.map(introductionDTO, Profile.class));
        return modelMapper.map(result, IntroductionDTO.class);
    }
}
