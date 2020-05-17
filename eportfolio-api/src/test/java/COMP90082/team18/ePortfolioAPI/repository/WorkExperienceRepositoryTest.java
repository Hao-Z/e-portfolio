package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.entity.userDataEntity.WorkExperience;
import COMP90082.team18.ePortfolioAPI.repository.userDataRepository.WorkExperienceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class WorkExperienceRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @BeforeEach
    void setUp() {
        User newUser = new User();
        newUser.setUsername("existingUser");
        newUser.setEmail("newUser@newUser.com");
        newUser.setPassword("******");
        newUser = userRepository.save(newUser);

        WorkExperience newWorkExperience = new WorkExperience();
        newWorkExperience.setUser(newUser);
        newWorkExperience.setDescription("Something");
        workExperienceRepository.save(newWorkExperience);
    }

    @Test
    void test(){

        User user = userRepository.findByUsername("existingUser");
//        System.out.println(workExperienceRepository.findByUser(user));
//        System.out.println(user);
//        WorkExperience newWorkExperience = new WorkExperience();
//        newWorkExperience.setUser(user);
//        newWorkExperience.setDescription("Something");
//        workExperienceRepository.save(newWorkExperience);
//        System.out.println(workExperienceRepository.findByUser(user));
//        System.out.println(user);

    }
}