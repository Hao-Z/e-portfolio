package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.LicenseCertification;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface LicenseCertificationRepository extends UserDataRepository<LicenseCertification> {
    List<LicenseCertification> findByUser(User user);
}
