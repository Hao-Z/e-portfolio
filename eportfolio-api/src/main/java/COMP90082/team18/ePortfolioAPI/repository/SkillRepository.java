package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Skill;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface SkillRepository extends UserDataRepository<Skill> {
    List<Skill> findByUser(User user);
}
