package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.AboutDTO;
import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}/about")
public class AboutController {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public AboutDTO getAbout(@PathVariable Long id){
        return modelMapper.map(profileService.getProfile(id), AboutDTO.class);
    }

    @PatchMapping
    public AboutDTO patchAbout(@PathVariable Long id, @RequestBody AboutDTO aboutDTO){
        Profile result = profileService.patchProfile(id, modelMapper.map(aboutDTO, Profile.class));
        return modelMapper.map(result, AboutDTO.class);
    }
}
