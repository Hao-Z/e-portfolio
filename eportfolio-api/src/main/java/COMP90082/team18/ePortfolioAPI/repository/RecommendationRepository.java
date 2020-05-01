package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Recommendation;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface RecommendationRepository extends UserDataRepository<Recommendation> {
    List<Recommendation> findByUser(User user);
}
