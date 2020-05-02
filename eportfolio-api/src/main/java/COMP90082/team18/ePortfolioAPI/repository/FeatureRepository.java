package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Feature;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface FeatureRepository extends UserDataRepository<Feature> {
    List<Feature> findByUser(User user);
}
