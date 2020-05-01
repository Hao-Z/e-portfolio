package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.HonourAward;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HonourAwardRepository extends JpaRepository<HonourAward, Long> {
    List<HonourAward> findByUser(User user);
}
