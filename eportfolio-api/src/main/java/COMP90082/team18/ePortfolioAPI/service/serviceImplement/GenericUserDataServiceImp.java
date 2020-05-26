package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.*;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.Education;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.WorkExperience;
import COMP90082.team18.ePortfolioAPI.repository.*;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import COMP90082.team18.ePortfolioAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class GenericUserDataServiceImp implements GenericUserDataService {
    @Autowired
    private ApplicationContext context;
    @Autowired
    private UserService userService;

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#id, 'User', 'read')")
    public <T extends GenericUserData> List<T> getAllObjects(Long id, Class T) {
        User targetUser = new User();
        targetUser.setId(id);
        UserDataRepository repository = getRepository(T);
        return repository.findByUser(targetUser);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#objectId, #T.getSimpleName(), 'read')")
    public <T extends GenericUserData> Optional<T> getObject(Long id, Long objectId, Class T) {
        UserDataRepository repository = getRepository(T);
        return repository.findById(objectId);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#id, 'User', 'write')")
    public <T extends GenericUserData> T postObject(Long id, T object) {
        UserDataRepository repository = getRepository(object.getClass());
        object.setId(null);
        User targetUser = new User();
        targetUser.setId(id);
        object.setUser(targetUser);
        repository.save(object);
        return resetDefault(object);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#objectId, #object.getClass().getSimpleName(), 'write')")
    public <T extends GenericUserData> T putObject(Long id, Long objectId, T object) {
        UserDataRepository repository = getRepository(object.getClass());
        GenericUserData targetObject = getObject(id, objectId, object.getClass())
                .orElseThrow(() -> new NullPointerException(
                        "Cannot find " + object.getClass().getSimpleName() + " with id = " + objectId));
        object.setId(targetObject.getId());
        object.setUser(targetObject.getUser());
        if(object instanceof WorkExperience && ((WorkExperience) object).getFlagCurrentPosition() != null){
            targetObject.getUser().setCurrentPosition((WorkExperience) object);
            ((WorkExperience) object).setFlagCurrentPosition(targetObject.getUser());
        }
        if(object instanceof Education && ((Education) object).getFlagCurrentEducation() != null){
            targetObject.getUser().setCurrentEducation((Education) object);
            ((Education) object).setFlagCurrentEducation(targetObject.getUser());
        }
        repository.save(object);
        return resetDefault(object);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#objectId, #T.getSimpleName(), 'write')")
    public <T extends GenericUserData> void deleteObject(Long id, Long objectId, Class T) {
        UserDataRepository repository = getRepository(T);
        GenericUserData targetObject = getObject(id, objectId, T).orElseThrow(() -> new NullPointerException(
                "Cannot find " + T.getSimpleName() + " with id = " + objectId));
        deleteDefault(targetObject);
        repository.delete(targetObject);
    }

    @SuppressWarnings("unchecked")
    private <T extends GenericUserData> T resetDefault(T object) {
        if (object instanceof WorkExperience && ((WorkExperience) object).getFlagCurrentPosition() != null) {
            Long userId = ((WorkExperience) object).getFlagCurrentPosition().getId();
            Map updateFields = new HashMap<String, Object>();
            updateFields.put("currentPosition", object);
            userService.patchUser(userId, updateFields);
            object = (T) getObject(userId, object.getId(), object.getClass()).orElse(null);
        } else if (object instanceof Education && ((Education) object).getFlagCurrentEducation() != null) {
            Long userId = ((Education) object).getFlagCurrentEducation().getId();
            Map updateFields = new HashMap<String, Object>();
            updateFields.put("currentEducation", object);
            userService.patchUser(userId, updateFields);
            object = (T) getObject(userId, object.getId(), object.getClass()).orElse(null);
        }
        return object;
    }

    @SuppressWarnings("unchecked")
    private <T extends GenericUserData> void deleteDefault(T object) {
        if (object instanceof WorkExperience && ((WorkExperience) object).getFlagCurrentPosition() != null) {
            Long userId = ((WorkExperience) object).getFlagCurrentPosition().getId();
            Map updateFields = new HashMap<String, Object>();
            updateFields.put("currentPosition", null);
            userService.patchUser(userId, updateFields);
        } else if (object instanceof Education && ((Education) object).getFlagCurrentEducation() != null) {
            Long userId = ((Education) object).getFlagCurrentEducation().getId();
            Map updateFields = new HashMap<String, Object>();
            updateFields.put("currentEducation", null);
            userService.patchUser(userId, updateFields);
        }
    }

    @SuppressWarnings("unchecked")
    private <T extends GenericUserData> UserDataRepository<T> getRepository(Class T) {
        char[] className = T.getSimpleName().toCharArray();
        className[0] = Character.toLowerCase(className[0]);
        return (UserDataRepository) context.getBean(new String(className) + "Repository");
    }
}
