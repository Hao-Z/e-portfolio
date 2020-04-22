package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.DTO.ProfileDTO;
import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.entity.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.ProfileRepository;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;

    public Result<Object> getProfile(Long id) {
        Profile returnedProfile = profileRepository.findById(id).orElse(null);
        if (returnedProfile == null) {
            return new Result<>("404 not found", false, null);
        } else {
            return new Result<>("200 ok", true, new ProfileDTO(returnedProfile));
        }
    }

    @PreAuthorize("hasPermission(#id, 'write')")
    public Result<Object> patchProfile(Long id, Profile profile) {
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser == null) {
            return new Result<>("404 not found", false, null);
        }

        Profile originalProfile = profileRepository.findById(id).orElse(null);
        if (originalProfile == null) {
            profile.setUser(targetUser);
            profileRepository.save(profile);
        } else {
            profileRepository.save(updateProfile(originalProfile, profile));
        }
        Profile returnedProfile = profileRepository.findByUser(targetUser);
        return new Result<>("200 ok", true, new ProfileDTO(returnedProfile));
    }

    private Profile updateProfile(Profile oldProfile, Profile newProfile) {
        if(newProfile.getBirthday() != null) oldProfile.setBirthday(newProfile.getBirthday());
        if(newProfile.getPhoneNumber() != null) oldProfile.setPhoneNumber(newProfile.getPhoneNumber());
        return oldProfile;
    }
}
