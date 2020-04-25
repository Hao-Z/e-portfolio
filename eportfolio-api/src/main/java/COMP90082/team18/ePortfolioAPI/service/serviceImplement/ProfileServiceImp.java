package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.DTO.AboutDTO;
import COMP90082.team18.ePortfolioAPI.DTO.IntroductionDTO;
import COMP90082.team18.ePortfolioAPI.DTO.ProfileDTO;
import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.ProfileRepository;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import COMP90082.team18.ePortfolioAPI.util.ObjectMethod;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImp implements ProfileService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private ModelMapper modelMapper;

    @PreAuthorize("hasPermission(#id, 'read')")
    public Result<ProfileDTO> getProfile(Long id) {
        Profile returnedProfile = profileRepository.findById(id).orElse(null);
        if (returnedProfile == null) {
            return new Result<>("404 not found", false, null);
        } else {
            return new Result<>("200 ok", true, modelMapper.map(returnedProfile, ProfileDTO.class));
        }
    }

    @PreAuthorize("hasPermission(#id, 'write')")
    public Result<ProfileDTO> patchProfile(Long id, Profile profile) {
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser == null) {
            return new Result<>("404 not found", false, null);
        }

        Profile originalProfile = profileRepository.findById(id).orElse(null);
        if (originalProfile == null) {
            profile.setUser(targetUser);
            profileRepository.save(profile);
        } else {
            profileRepository.save(ObjectMethod.update(originalProfile, profile));
        }
        Profile returnedProfile = profileRepository.findByUser(targetUser);
        return new Result<>("200 ok", true, modelMapper.map(returnedProfile, ProfileDTO.class));
    }

    @PreAuthorize("hasPermission(#id, 'read')")
    public Result<IntroductionDTO> getIntroduction(Long id) {
        Profile returnedProfile = profileRepository.findById(id).orElse(null);
        if (returnedProfile == null) {
            return new Result<>("404 not found", false, null);
        } else {
            return new Result<>("200 ok", true, modelMapper.map(returnedProfile, IntroductionDTO.class));
        }
    }

    @PreAuthorize("hasPermission(#id, 'write')")
    public Result<IntroductionDTO> patchIntroduction(Long id, Profile profile) {
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser == null) {
            return new Result<>("404 not found", false, null);
        }

        Profile originalProfile = profileRepository.findById(id).orElse(null);
        if (originalProfile == null) {
            profile.setUser(targetUser);
            profileRepository.save(profile);
        } else {
            profileRepository.save(ObjectMethod.update(originalProfile, profile));
        }
        Profile returnedProfile = profileRepository.findByUser(targetUser);
        return new Result<>("200 ok", true, modelMapper.map(returnedProfile, IntroductionDTO.class));
    }

    @PreAuthorize("hasPermission(#id, 'read')")
    public Result<AboutDTO> getAbout(Long id) {
        Profile returnedProfile = profileRepository.findById(id).orElse(null);
        if (returnedProfile == null) {
            return new Result<>("404 not found", false, null);
        } else {
            return new Result<>("200 ok", true, modelMapper.map(returnedProfile, AboutDTO.class));
        }
    }

    @PreAuthorize("hasPermission(#id, 'write')")
    public Result<AboutDTO> patchAbout(Long id, Profile profile) {
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser == null) {
            return new Result<>("404 not found", false, null);
        }

        Profile originalProfile = profileRepository.findById(id).orElse(null);
        if (originalProfile == null) {
            profile.setUser(targetUser);
            profileRepository.save(profile);
        } else {
            profileRepository.save(ObjectMethod.update(originalProfile, profile));
        }
        Profile returnedProfile = profileRepository.findByUser(targetUser);
        return new Result<>("200 ok", true, modelMapper.map(returnedProfile, AboutDTO.class));
    }

}
