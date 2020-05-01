package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.LicenseCertification;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenseCertificationRepository extends JpaRepository<LicenseCertification, Long> {
    List<LicenseCertification> findByUser(User user);
}
