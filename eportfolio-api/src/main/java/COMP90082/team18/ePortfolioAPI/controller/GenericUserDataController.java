package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.*;
import COMP90082.team18.ePortfolioAPI.DTO.userDataDTO.EducationDTO;
import COMP90082.team18.ePortfolioAPI.DTO.userDataDTO.WorkExperienceDTO;
import COMP90082.team18.ePortfolioAPI.entity.*;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.Education;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.WorkExperience;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
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
    private GenericUserDataService genericUserDataService;
    @Autowired
    private List<Class<? extends GenericUserData>> userDataEntityClasses;
    @Autowired
    private List<Class<? extends DTO>> userDataDTOClasses;

    @GetMapping("/cv")
    public Map<String, Object> getCV(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();
        result.put("introduction", userController.getIntroduction(id));
        result.put("about", userController.getAbout(id));
        for (Class<? extends GenericUserData> x : userDataEntityClasses) {
            String className = x.getSimpleName().toLowerCase();
            result.put(className, getAllObjects(id, className));
        }
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
        GenericUserData result = genericUserDataService.getObject(id, objectId, entityClass)
                .orElseThrow(() -> new NullPointerException(
                        "Cannot find " + entityClass.getSimpleName() + " with id = " + objectId));
        return toDTO(result, dtoClass);
    }

    @PostMapping
    public DTO postObject(@PathVariable Long id,
                          @RequestParam("class") String targetClass,
                          @RequestBody Map<String, Object> object) {
        Class<? extends GenericUserData> entityClass = getEntityClass(targetClass);
        Class<? extends DTO> dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.postObject(id, toEntity(id, object, entityClass));
        return toDTO(result, dtoClass);
    }

    @PutMapping
    public DTO putObject(@PathVariable Long id,
                         @RequestParam("class") String targetClass,
                         @RequestParam("object-id") Long objectId,
                         @RequestBody Map<String, Object> object) {
        Class<? extends GenericUserData> entityClass = getEntityClass(targetClass);
        Class<? extends DTO> dtoClass = getDTOClass(targetClass);
        GenericUserData result = genericUserDataService.putObject(id, objectId, toEntity(id, object, entityClass));
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
        return userDataEntityClasses.stream()
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

    private <T extends GenericUserData> T toEntity(Long userId, Map<String, Object> dto, Class T) {
        T result = modelMapper.map(dto, (Type) T);
        if (result instanceof WorkExperience) {
            if (dto.containsKey("isCurrentWork")
                    && dto.get("isCurrentWork") != null && (boolean) dto.get("isCurrentWork")) {
                User targetUser = new User();
                targetUser.setId(userId);
                ((WorkExperience) result).setFlagCurrentPosition(targetUser);
            }
        } else if (result instanceof Education) {
            if (dto.containsKey("isDefault")
                    && dto.get("isDefault")!= null && (boolean) dto.get("isDefault")) {
                User targetUser = new User();
                targetUser.setId(userId);
                ((Education) result).setFlagCurrentEducation(targetUser);
            }
        }
        return result;
    }

    private <T extends DTO> T toDTO(Object entity, Class<? extends DTO> T) {
        T result = modelMapper.map(entity, (Type) T);
        if (entity instanceof WorkExperience) {
            boolean isDefault = ((WorkExperience) entity).getFlagCurrentPosition() != null;
            ((WorkExperienceDTO) result).setDefault(isDefault);
        } else if (entity instanceof Education) {
            boolean isDefault = ((Education) entity).getFlagCurrentEducation() != null;
            ((EducationDTO) result).setDefault(isDefault);
        }
        return result;
    }
}
