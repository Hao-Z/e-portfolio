package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.*;
import COMP90082.team18.ePortfolioAPI.repository.*;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GenericUserDataServiceImp implements GenericUserDataService {
    @Autowired
    private EducationRepository educationRepository;
    @Autowired
    private FeatureRepository featureRepository;
    @Autowired
    private HonourAwardRepository honourAwardRepository;
    @Autowired
    private LanguageRepository languageRepository;
    @Autowired
    private LicenseCertificationRepository licenseCertificationRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private RecommendationRepository recommendationRepository;
    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private VolunteerExperienceRepository volunteerExperienceRepository;
    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    private Map<Type, UserDataRepository> allJpaRepositories;

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public <T extends GenericUserData> List<T> getAllObjects(Long id, Type T) {
        User targetUser = new User();
        targetUser.setId(id);
        UserDataRepository repository = getRepository(T);
        return repository.findByUser(targetUser);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public <T extends GenericUserData> T getObject(Long id, Long objectId, Type T) {
        UserDataRepository repository = getRepository(T);
        return (T) repository.findById(objectId).orElse(null);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public <T extends GenericUserData> T postObject(Long id, T object) {
        UserDataRepository repository = getRepository(object.getClass());
        User targetUser = new User();
        targetUser.setId(id);
        object.setUser(targetUser);
        return (T) repository.save(object);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public <T extends GenericUserData> T putObject(Long id, Long objectId, T object) {
        UserDataRepository repository = getRepository(object.getClass());
        GenericUserData targetObject = getObject(id, objectId, object.getClass());
        object.setId(targetObject.getId());
        object.setUser(targetObject.getUser());
        return (T) repository.save(object);
    }

    private UserDataRepository getRepository(Type T) {
        if (allJpaRepositories == null) {
            allJpaRepositories = new HashMap();
            allJpaRepositories.put(Education.class, educationRepository);
            allJpaRepositories.put(Feature.class, featureRepository);
            allJpaRepositories.put(HonourAward.class, honourAwardRepository);
            allJpaRepositories.put(Language.class, languageRepository);
            allJpaRepositories.put(LicenseCertification.class, licenseCertificationRepository);
            allJpaRepositories.put(Project.class, projectRepository);
            allJpaRepositories.put(Publication.class, publicationRepository);
            allJpaRepositories.put(Recommendation.class, recommendationRepository);
            allJpaRepositories.put(Skill.class, skillRepository);
            allJpaRepositories.put(VolunteerExperience.class, volunteerExperienceRepository);
            allJpaRepositories.put(WorkExperience.class, workExperienceRepository);
        }
        if (!allJpaRepositories.containsKey(T)) {
            throw new IllegalArgumentException("No matched repository.");
        }
        return allJpaRepositories.get(T);
    }
}
