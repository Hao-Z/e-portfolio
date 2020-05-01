package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.entity.WorkExperience;

import java.util.List;

public interface WorkExperienceRepository extends UserDataRepository<WorkExperience> {
    List<WorkExperience> findByUser(User user);
}
