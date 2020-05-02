package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.*;
import COMP90082.team18.ePortfolioAPI.entity.*;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}")
public class GenericUserDataController {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private GenericUserDataService genericUserDataService;

    private final static Map<String, List<Type>> allClasses = new HashMap<>();

    static {
        allClasses.put("education", Arrays.asList(Education.class, EducationDTO.class,
                new TypeToken<List<EducationDTO>>(){}.getType()));
        allClasses.put("feature", Arrays.asList(Feature.class, FeatureDTO.class,
                new TypeToken<List<FeatureDTO>>(){}.getType()));
        allClasses.put("honour-award", Arrays.asList(HonourAward.class, HonourAwardDTO.class,
                new TypeToken<List<HonourAwardDTO>>(){}.getType()));
        allClasses.put("language", Arrays.asList(Language.class, LanguageDTO.class,
                new TypeToken<List<LanguageDTO>>(){}.getType()));
        allClasses.put("license-certification", Arrays.asList(LicenseCertification.class, LicenseCertificationDTO.class,
                new TypeToken<List<LicenseCertificationDTO>>(){}.getType()));
        allClasses.put("project", Arrays.asList(Project.class, ProjectDTO.class,
                new TypeToken<List<ProjectDTO>>(){}.getType()));
        allClasses.put("publication", Arrays.asList(Publication.class, PublicationDTO.class,
                new TypeToken<List<PublicationDTO>>(){}.getType()));
        allClasses.put("recommendation", Arrays.asList(Recommendation.class, RecommendationDTO.class,
                new TypeToken<List<RecommendationDTO>>(){}.getType()));
        allClasses.put("skill", Arrays.asList(Skill.class, SkillDTO.class,
                new TypeToken<List<SkillDTO>>(){}.getType()));
        allClasses.put("volunteerExperience", Arrays.asList(VolunteerExperience.class, VolunteerExperienceDTO.class,
                new TypeToken<List<VolunteerExperienceDTO>>(){}.getType()));
        allClasses.put("work-experience", Arrays.asList(WorkExperience.class, WorkExperienceDTO.class,
                new TypeToken<List<WorkExperienceDTO>>(){}.getType()));
    }

    @GetMapping("/all")
    public List<DTO> getAllObjects(@PathVariable Long id,
                                   @RequestParam("class") String targetClass) {
        if (!allClasses.containsKey(targetClass)) {
            throw new IllegalArgumentException("No matched object type.");
        }
        List<Type> classes = allClasses.get(targetClass);
        List<GenericUserData> result = genericUserDataService.getAllObjects(id, classes.get(0));
        return modelMapper.map(result, classes.get(2));
    }

    @GetMapping
    public DTO getObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId){
        if (!allClasses.containsKey(targetClass)) {
            throw new IllegalArgumentException("No matched object type.");
        }
        List<Type> classes = allClasses.get(targetClass);
        GenericUserData result = genericUserDataService.getObject(id, objectId, classes.get(0));
        return modelMapper.map(result, classes.get(1));
    }

    @PostMapping
    public DTO postObject(@PathVariable Long id,
                          @RequestParam("class") String targetClass,
                          @RequestBody Object object){
        if (!allClasses.containsKey(targetClass)) {
            throw new IllegalArgumentException("No matched object type.");
        }
        List<Type> classes = allClasses.get(targetClass);
        GenericUserData result = genericUserDataService.postObject(id, modelMapper.map(object, classes.get(0)));
        return modelMapper.map(result, classes.get(1));
    }

    @PutMapping
    public DTO putObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId,
                         @RequestBody Object object){
        if (!allClasses.containsKey(targetClass)) {
            throw new IllegalArgumentException("No matched object type.");
        }
        List<Type> classes = allClasses.get(targetClass);
        GenericUserData result = genericUserDataService.putObject(id, objectId, modelMapper.map(object, classes.get(0)));
        return modelMapper.map(result, classes.get(1));
    }

}
