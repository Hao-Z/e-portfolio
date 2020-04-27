package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Profile;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class ProfileRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProfileRepository profileRepository;

    @BeforeEach
    void setUp() {
        User newUser = new User();
        newUser.setUsername("existingUser");
        newUser.setEmail("newUser@newUser.com");
        newUser.setPassword("******");
        newUser = userRepository.save(newUser);

        Profile newProfile = new Profile();
        newProfile.setUser(newUser);
        newProfile.setBirthday(new Date());
        newProfile.setPhoneNumber("0410000000");
        profileRepository.save(newProfile);
    }

    @Test
    void findByUser() {
        User testUser = userRepository.findByUsername("existingUser");
        Profile returnedProfile = profileRepository.findByUser(testUser);
        assertEquals(testUser.getId(), returnedProfile.getId());
    }

    @Test
    void whenFindByUserAndNoRecordShouldReturnNull() {
        User testUser = new User();
        testUser.setId((long) -1);
        Profile returnedProfile = profileRepository.findByUser(testUser);
        assertNull(returnedProfile);
    }
}