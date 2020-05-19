package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.*;
import COMP90082.team18.ePortfolioAPI.repository.*;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenericUserDataServiceImp implements GenericUserDataService {
    @Autowired
    private ApplicationContext context;

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#id, 'read')")
    public <T extends GenericUserData> List<T> getAllObjects(Long id, Class T) {
        User targetUser = new User();
        targetUser.setId(id);
        UserDataRepository repository = getRepository(T);
        return repository.findByUser(targetUser);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#id, 'read')")
    public <T extends GenericUserData> T getObject(Long id, Long objectId, Class T) {
        UserDataRepository repository = getRepository(T);
        return (T) repository.findById(objectId).orElse(null);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#id, 'write')")
    public <T extends GenericUserData> T postObject(Long id, T object) {
        UserDataRepository repository = getRepository(object.getClass());
        User targetUser = new User();
        targetUser.setId(id);
        object.setUser(targetUser);
        return (T) repository.save(object);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#id, 'write')")
    public <T extends GenericUserData> T putObject(Long id, Long objectId, T object) {
        UserDataRepository repository = getRepository(object.getClass());
        GenericUserData targetObject = getObject(id, objectId, object.getClass());
        object.setId(targetObject.getId());
        object.setUser(targetObject.getUser());
        return (T) repository.save(object);
    }

    @Override
    @SuppressWarnings("unchecked")
    @PreAuthorize("hasPermission(#id, 'write')")
    public <T extends GenericUserData> void deleteObject(Long id, Long objectId, Class T) {
        UserDataRepository repository = getRepository(T);
        GenericUserData targetObject = getObject(id, objectId, T);
        repository.delete(targetObject);
    }

    @SuppressWarnings("unchecked")
    private <T extends GenericUserData> UserDataRepository<T> getRepository(Class T) {
        char[] className = T.getSimpleName().toCharArray();
        className[0] = Character.toLowerCase(className[0]);
        return (UserDataRepository) context.getBean(new String(className) + "Repository");
    }
}
