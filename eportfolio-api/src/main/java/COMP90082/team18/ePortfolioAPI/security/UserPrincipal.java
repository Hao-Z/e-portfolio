package COMP90082.team18.ePortfolioAPI.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collections;

public class UserPrincipal extends User {
    private final Long id;
    private final boolean admin;

    public UserPrincipal(COMP90082.team18.ePortfolioAPI.entity.User user) {
        super(user.getUsername(), user.getPassword(), user.isAdmin() ?
                Collections.singletonList(new SimpleGrantedAuthority("ADMIN")) : new ArrayList<>());
        this.id = user.getId();
        this.admin = user.isAdmin();
    }

    public Long getId() {
        return id;
    }

    public boolean isAdmin() {
        return admin;
    }

}
