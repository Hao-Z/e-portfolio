package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.User;

import javax.servlet.http.HttpServletResponse;

public interface UserService {
    Result<Object> signUp(User user, Result<Object> res, HttpServletResponse resp);

    boolean checkUsername(String username);
}
