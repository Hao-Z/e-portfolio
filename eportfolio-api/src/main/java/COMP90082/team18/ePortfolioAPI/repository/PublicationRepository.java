package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.Publication;
import COMP90082.team18.ePortfolioAPI.entity.User;

import java.util.List;

public interface PublicationRepository extends UserDataRepository<Publication> {
    List<Publication> findByUser(User user);
}
