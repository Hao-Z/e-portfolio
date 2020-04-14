package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

}
