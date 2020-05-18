package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.*;
import COMP90082.team18.ePortfolioAPI.DTO.userDataDTO.EducationDTO;
import COMP90082.team18.ePortfolioAPI.DTO.userDataDTO.WorkExperienceDTO;
import COMP90082.team18.ePortfolioAPI.entity.*;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.Education;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.WorkExperience;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}")
public class GenericUserDataController {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserController userController;

    @Autowired
    private UserService userService;

    @Autowired
    private GenericUserDataService genericUserDataService;

    @Autowired
    private Set<Class<? extends GenericUserData>> entityClasses;

    @Autowired
    private Set<Class<? extends DTO>> userDataDTOClasses;

    @GetMapping("/cv")
    public Map<String, Object> getCV(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        result.put("introduction", userController.getIntroduction(id));
        entityClasses.stream()
                .forEach(x -> {
                            String className = x.getSimpleName().toLowerCase();
                            result.put(className, getAllObjects(id, className));
                        }
                );
        return result;
    }

    @GetMapping("/all")
    public List<Object> getAllObjects(@PathVariable Long id,
                                      @RequestParam("class") String targetClass) {
        Class<? extends GenericUserData> entityClass = getEntityClass(targetClass);
        Class<? extends DTO> dtoClass = getDTOClass(targetClass);
        List<GenericUserData> result = genericUserDataService.getAllObjects(id, entityClass);
        return result.stream().map(x -> toDTO(x, dtoClass)).collect(toList());
    }

    @GetMapping
    public DTO getObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId) {
        Class<? extends GenericUserData> entityClass = getEntityClass(targetClass);
        Class<? extends DTO> dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.getObject(id, objectId, entityClass);
        return toDTO(result, dtoClass);
    }

    @PostMapping
    public DTO postObject(@PathVariable Long id,
                          @RequestParam("class") String targetClass,
                          @RequestBody Object object) {
        Class<? extends GenericUserData> entityClass = getEntityClass(targetClass);
        Class<? extends DTO> dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.postObject(id, modelMapper.map(object, entityClass));
        result = resetDefault(result, modelMapper.map(object, dtoClass));
        return toDTO(result, dtoClass);
    }

    @PutMapping
    public DTO putObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId,
                         @RequestBody Object object) {
        Class<? extends GenericUserData> entityClass = getEntityClass(targetClass);
        Class<? extends DTO> dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.putObject(id, objectId, modelMapper.map(object, entityClass));
        result = resetDefault(result, modelMapper.map(object, dtoClass));
        return toDTO(result, dtoClass);
    }

    @DeleteMapping
    public void deleteObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId) {
        Class<? extends GenericUserData> entityClass = getEntityClass(targetClass);
        genericUserDataService.deleteObject(id, objectId, entityClass);
    }

    private Class<? extends GenericUserData> getEntityClass(String className) {
        return entityClasses.stream()
                .filter(x -> x.getSimpleName().toLowerCase().equals(className.toLowerCase()))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("No matched object type."));
    }

    private Class<? extends DTO> getDTOClass(String className) {
        return userDataDTOClasses.stream()
                .filter(x -> x.getSimpleName().toLowerCase().equals(className.toLowerCase() + "dto"))
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

    private <T extends DTO> T toDTO(Object entity, Class<? extends DTO> T) {
        T result = modelMapper.map(entity, (Type) T);
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
