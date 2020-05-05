package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.*;
import COMP90082.team18.ePortfolioAPI.entity.*;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}")
public class GenericUserDataController {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private GenericUserDataService genericUserDataService;

    private final static List<Type> entityClasses = Arrays.asList(
            Education.class, Feature.class, HonourAward.class, Language.class,
            LicenseCertification.class, Project.class, Publication.class, Recommendation.class,
            Skill.class, VolunteerExperience.class, WorkExperience.class);

    private final static List<Type> dtoClasses = Arrays.asList(
            EducationDTO.class, FeatureDTO.class, HonourAwardDTO.class, LanguageDTO.class,
            LicenseCertificationDTO.class, ProjectDTO.class, PublicationDTO.class, RecommendationDTO.class,
            SkillDTO.class, VolunteerExperienceDTO.class, WorkExperienceDTO.class);


    @GetMapping("/all")
    public List<Object> getAllObjects(@PathVariable Long id,
                                      @RequestParam("class") String targetClass) {
        Type entityClass = getEntityClass(targetClass);
        Type dtoClass = getDTOClass(targetClass);
        List<GenericUserData> result = genericUserDataService.getAllObjects(id, entityClass);
        return result.stream().map(x -> toDTO(x, dtoClass)).collect(toList());
    }

    @GetMapping
    public DTO getObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId) {
        Type entityClass = getEntityClass(targetClass);
        Type dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.getObject(id, objectId, entityClass);
        return toDTO(result, dtoClass);
    }

    @PostMapping
    public DTO postObject(@PathVariable Long id,
                          @RequestParam("class") String targetClass,
                          @RequestBody Object object) {
        Type entityClass = getEntityClass(targetClass);
        Type dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.postObject(id, modelMapper.map(object, entityClass));
        result = resetDefault(result, modelMapper.map(object, dtoClass));
        return toDTO(result, dtoClass);
    }

    @PutMapping
    public DTO putObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId,
                         @RequestBody Object object) {
        Type entityClass = getEntityClass(targetClass);
        Type dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.putObject(id, objectId, modelMapper.map(object, entityClass));
        result = resetDefault(result, modelMapper.map(object, dtoClass));
        return toDTO(result, dtoClass);
    }

    private Type getEntityClass(String className) {
        return entityClasses.stream()
                .filter(x -> ((Class) x).getSimpleName().toLowerCase().equals(className))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("No matched object type."));
    }

    private Type getDTOClass(String className) {
        return dtoClasses.stream()
                .filter(x -> ((Class) x).getSimpleName().toLowerCase().equals(className + "dto"))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("No matched object type."));
    }

    private GenericUserData resetDefault(GenericUserData result, DTO object) {
        if (result instanceof WorkExperience && ((WorkExperienceDTO) object).isDefault()) {
            User user = new User();
            user.setCurrentPosition((WorkExperience) result);
            userService.patchUser(result.getUser().getId(), user);
            result = genericUserDataService.getObject(result.getUser().getId(), result.getId(), result.getClass());
        } else if (result instanceof Education && ((EducationDTO) object).isDefault()) {
            User user = new User();
            user.setCurrentEducation((Education) result);
            userService.patchUser(result.getUser().getId(), user);
            result = genericUserDataService.getObject(result.getUser().getId(), result.getId(), result.getClass());
        }
        return result;
    }

    private <T> T toDTO(Object entity, Type T) {
        T result = modelMapper.map(entity, T);
        if (entity instanceof WorkExperience) {
            User targetUser = userService.getUser(((WorkExperience) entity).getUser().getId());
            boolean isDefault = (entity.equals(targetUser.getCurrentPosition()));
            ((WorkExperienceDTO) result).setDefault(isDefault);
        } else if (entity instanceof Education) {
            User targetUser = userService.getUser(((Education) entity).getUser().getId());
            boolean isDefault = (entity.equals(targetUser.getCurrentEducation()));
            ((EducationDTO) result).setDefault(isDefault);
        }
        return result;
    }
}
