package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.HonourAward;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface HonourAwardRepository extends UserDataRepository<HonourAward> {
    List<HonourAward> findByUser(User user);
}
