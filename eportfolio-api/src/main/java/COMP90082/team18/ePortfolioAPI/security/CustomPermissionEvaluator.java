package COMP90082.team18.ePortfolioAPI.security;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.Map;

public class CustomPermissionEvaluator implements PermissionEvaluator {
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

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        if ((authentication == null) || (targetType == null) || !(permission instanceof String)) {
            return false;
        }
        // Not used now.
        return false;
    }

    private boolean writePermission(Authentication authentication, Object targetDomainObject) {
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            return true;
        }
        if (targetDomainObject instanceof Long) {
            return authentication.getPrincipal().equals(targetDomainObject);
        }
        return false;
    }

    private boolean readPermission(Authentication authentication, Object targetDomainObject) {
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            return true;
        }
        if (targetDomainObject instanceof Long) {
            if (targetDomainObject.equals(authentication.getPrincipal()))
                return true;
        }
        if (authentication.getCredentials() instanceof Map) {
            if (targetDomainObject.equals(((Map) authentication.getCredentials()).get("read_only_id")))
                return true;
        }
        return false;
    }

}
