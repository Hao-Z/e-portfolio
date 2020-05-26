package COMP90082.team18.ePortfolioAPI.security;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import COMP90082.team18.ePortfolioAPI.entity.User;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.Map;
import java.util.Optional;

public class CustomPermissionEvaluator implements PermissionEvaluator {
    @Autowired
    private ApplicationContext context;

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        if ((authentication == null) || (targetType == null) || !(permission instanceof String)) {
            return false;
        }
        Object targetDomainObject = getObject(targetId, targetType);
        return hasPermission(authentication, targetDomainObject, permission);
    }

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        if ((authentication == null) || (targetDomainObject == null) || !(permission instanceof String)) {
            return false;
        }
        switch ((String) permission) {
            case "read":
                return readPermission(authentication, targetDomainObject);
            case "write":
                return writePermission(authentication, targetDomainObject);
        }
        return false;
    }

    private boolean writePermission(Authentication authentication, Object targetDomainObject) {
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            return true;
        }

        Long targetUserId = getTargetUserId(targetDomainObject);

        return targetUserId.equals(authentication.getPrincipal());
    }

    private boolean readPermission(Authentication authentication, Object targetDomainObject) {
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            return true;
        }

        Long targetUserId = getTargetUserId(targetDomainObject);
        Long readOnlyId = getReadOnlyId(authentication);
        boolean isPublic = getUserPrivacy(targetDomainObject);

        return isPublic || targetUserId.equals(authentication.getPrincipal()) || targetUserId.equals(readOnlyId);
    }

    @SneakyThrows
    @SuppressWarnings("unchecked")
    private Object getObject(Serializable targetId, String targetType) {
        JpaRepository repository = getRepository(targetType);
        Object object = repository.findById(targetId);
        if (object instanceof Optional){
            object = ((Optional) object).orElseThrow(() ->
                    new NullPointerException("Cannot find " + targetType + " with id = " + targetId));
        }
        return object;
    }

    @SuppressWarnings("unchecked")
    private Long getTargetUserId(Object targetDomainObject) {
        if (targetDomainObject instanceof User) {
            return ((User) targetDomainObject).getId();
        }
        if (targetDomainObject instanceof GenericUserData) {
            return ((GenericUserData) targetDomainObject).getUser().getId();
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private Long getReadOnlyId(Authentication authentication) {
        if (authentication.getCredentials() instanceof Map) {
            return (Long) ((Map) authentication.getCredentials()).get("read_only_id");
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private boolean getUserPrivacy(Object targetDomainObject) {
        if (targetDomainObject instanceof User) {
            return ((User) targetDomainObject).isPublic();
        }
        if (targetDomainObject instanceof GenericUserData) {
            return ((GenericUserData) targetDomainObject).getUser().isPublic();
        }
        return false;
    }

    @SuppressWarnings("unchecked")
    private JpaRepository getRepository(String targetType) {
        char[] className = targetType.toCharArray();
        className[0] = Character.toLowerCase(className[0]);
        return (JpaRepository) context.getBean(new String(className) + "Repository");
    }
}
