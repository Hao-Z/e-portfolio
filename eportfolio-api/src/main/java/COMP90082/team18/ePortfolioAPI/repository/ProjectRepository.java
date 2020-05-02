package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Project;
import COMP90082.team18.ePortfolioAPI.entity.User;
import java.util.List;

public interface ProjectRepository extends UserDataRepository<Project> {
    List<Project> findByUser(User user);
}
