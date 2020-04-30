package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.User;

public interface UserService {
    User signUp(User user);

    boolean checkUsername(User user);
}
