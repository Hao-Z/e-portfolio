package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.entity.VolunteerExperience;

import java.util.List;

public interface VolunteerExperienceRepository extends UserDataRepository<VolunteerExperience> {
    List<VolunteerExperience> findByUser(User user);
}
