package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Project;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}
