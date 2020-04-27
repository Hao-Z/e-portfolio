package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.entity.WorkExperience;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.repository.WorkExperienceRepository;
import COMP90082.team18.ePortfolioAPI.service.WorkExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkExperienceImp implements WorkExperienceService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public List<WorkExperience> getAllWorkExperiences(Long id) {
        User targetUser = userRepository.findById(id).orElse(null);
        return workExperienceRepository.findByUser(targetUser);
        //TODO: Using userService and return targetUser.getWorkExperiences;
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public WorkExperience getWorkExperience(Long id, Long workExperiencesId) {
        return workExperienceRepository.findById(workExperiencesId).orElseThrow();
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public WorkExperience postWorkExperience(Long id, WorkExperience workExperience) {
        User targetUser = new User();
        targetUser.setId(id);
        workExperience.setUser(targetUser);
        return workExperienceRepository.save(workExperience);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public WorkExperience putWorkExperience(Long id, Long workExperiencesId, WorkExperience workExperience) {
        WorkExperience targetWorkExperience = workExperienceRepository.findById(workExperiencesId).orElseThrow();
        //TODO
        return null;
    }
}
