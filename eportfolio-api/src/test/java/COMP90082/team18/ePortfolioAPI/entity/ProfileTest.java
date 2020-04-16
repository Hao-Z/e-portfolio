package COMP90082.team18.ePortfolioAPI.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProfileTest {
    @Test
    void body(){
        Profile profile = new Profile();
        User user = new User();
        user.setId((long) 1);
        user.setUsername("testUser");
        profile.setUser(user);
        assertEquals((long) 1, profile.body().get("userId"));
        assertEquals("testUser", profile.body().get("username"));
    }
}