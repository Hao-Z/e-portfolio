package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Feature;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
    List<Feature> findByUser(User user);
}
