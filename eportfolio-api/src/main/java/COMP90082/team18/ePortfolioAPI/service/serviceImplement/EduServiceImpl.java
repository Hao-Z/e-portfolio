package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.Education;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.entity.WorkExperience;
import COMP90082.team18.ePortfolioAPI.repository.EduRepository;
import COMP90082.team18.ePortfolioAPI.repository.WorkExperienceRepository;
import COMP90082.team18.ePortfolioAPI.service.EduService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EduServiceImpl implements EduService {

    @Autowired
    private EduRepository eduRepository;

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public List<Education> getAllEducation(Long id) {
        User target = new User();
        target.setId(id);
        return eduRepository.findByUser(target);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public Education getEducation(Long id, Long eduId) {
        return eduRepository.findById(eduId)
                .orElseThrow(() -> new NullPointerException("Education not found, maybe wrong id."));
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Education postEducation(Long id, Education education) {
        User target = new User();
        target.setId(id);
        education.setUser(target);
        return eduRepository.save(education);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Education putEducation(Long id, Long eduId, Education education) {
        User target = new User();
        target.setId(id);
        education.setId(eduId);
        education.setUser(target);
        return eduRepository.save(education);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public void delEducation(Long id, Long eduId) {
        eduRepository.deleteById(eduId);
    }
}
