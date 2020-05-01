package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.entity.VolunteerExperience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VolunteerExperienceRepository extends JpaRepository<VolunteerExperience, Long> {
    List<VolunteerExperience> findByUser(User user);
}
