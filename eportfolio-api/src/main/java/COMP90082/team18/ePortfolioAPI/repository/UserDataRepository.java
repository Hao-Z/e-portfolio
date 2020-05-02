package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface UserDataRepository<T extends GenericUserData> extends JpaRepository<T, Long> {
    List<T> findByUser(User user);
}
