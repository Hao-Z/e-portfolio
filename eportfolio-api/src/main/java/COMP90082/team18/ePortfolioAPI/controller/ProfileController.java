package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.ProfileDTO;
import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}/profile")
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ProfileDTO getProfile(@PathVariable Long id){
        return modelMapper.map(profileService.getProfile(id), ProfileDTO.class);
    }

    @PatchMapping
    public ProfileDTO patchProfile(@PathVariable Long id, @RequestBody ProfileDTO profileDTO){
        Profile result = profileService.patchProfile(id, modelMapper.map(profileDTO, Profile.class));
        return modelMapper.map(result, ProfileDTO.class);
    }
}
