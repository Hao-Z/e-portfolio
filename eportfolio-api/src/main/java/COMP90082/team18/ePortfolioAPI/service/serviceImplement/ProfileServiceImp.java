package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.ProfileRepository;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.service.ProfileService;
import COMP90082.team18.ePortfolioAPI.util.ObjectMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImp implements ProfileService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public Profile getProfile(Long id) {
        return profileRepository.findById(id).orElseThrow();
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Profile patchProfile(Long id, Profile profile) {
        User targetUser = new User();
        targetUser.setId(id);
        profile.setId(id);
        profile.setUser(targetUser);
        Profile originalProfile = profileRepository.findById(id).orElse(null);
        if (originalProfile == null) {
            return profileRepository.save(profile);
        } else {
            return profileRepository.save(ObjectMethod.update(originalProfile, profile));
        }
    }

}
