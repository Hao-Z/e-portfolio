package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Language;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface LanguageRepository extends UserDataRepository<Language> {
    List<Language> findByUser(User user);
}
