package COMP90082.team18.ePortfolioAPI.repository;

import COMP90082.team18.ePortfolioAPI.DTO.UserDTO;
import COMP90082.team18.ePortfolioAPI.DTO.UserProjection;
import COMP90082.team18.ePortfolioAPI.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    @Query(value = "SELECT new COMP90082.team18.ePortfolioAPI.DTO.UserProjection(u.username, u.email, e.degree, e.grade)" +
            " FROM User u JOIN Education e ON u.id = e.user.id")
    Page<UserProjection> resfindCustomized(Pageable pageable);

}
