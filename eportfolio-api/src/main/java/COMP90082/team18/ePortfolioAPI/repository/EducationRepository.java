package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Education;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface EducationRepository extends UserDataRepository<Education> {

    List<Education> findByUser(User user);

}
