package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.Education;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.EducationRepository;
import COMP90082.team18.ePortfolioAPI.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public List<Education> getAllEducation(Long id) {
        User target = new User();
        target.setId(id);
        return educationRepository.findByUser(target);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public Education getEducation(Long id, Long eduId) {
        return educationRepository.findById(eduId)
                .orElseThrow(() -> new NullPointerException("Education not found, maybe wrong id."));
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Education postEducation(Long id, Education education) {
        User target = new User();
        target.setId(id);
        education.setUser(target);
        return educationRepository.save(education);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Education putEducation(Long id, Long eduId, Education education) {
        User target = new User();
        target.setId(id);
        education.setId(eduId);
        education.setUser(target);
        return educationRepository.save(education);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public void delEducation(Long id, Long eduId) {
        educationRepository.deleteById(eduId);
    }
}
