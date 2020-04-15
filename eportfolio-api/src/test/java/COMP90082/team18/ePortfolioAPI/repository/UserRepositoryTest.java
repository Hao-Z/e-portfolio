package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        User newUser = new User();
        newUser.setUsername("existingUser");
        newUser.setEmail("newUser@newUser.com");
        newUser.setPassword("******");
        userRepository.save(newUser);
    }

    @Test
    void findByUsername() {
        User returnedUser = userRepository.findByUsername("existingUser");
        assertEquals("existingUser", returnedUser.getUsername());
    }

}