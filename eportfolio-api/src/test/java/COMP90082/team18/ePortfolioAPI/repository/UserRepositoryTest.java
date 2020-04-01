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
        newUser.setAccountName("existingUser");
        userRepository.save(newUser);
    }

    @Test
    void findByAccountName() {
        Iterable<User> returnedUsers = userRepository.findByAccountName("existingUser");
        List<String> returnedAccountNames = new ArrayList<>();
        for (User user:returnedUsers) {
            returnedAccountNames.add(user.getAccountName());
        }

        List<String> rightAnswer = new ArrayList<>();
        rightAnswer.add("existingUser");

        assertIterableEquals(rightAnswer, returnedAccountNames);
    }

}