package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.Profile;

public interface ProfileService {
    public Result<Object> getProfile(Long id);

    public Result<Object> patchProfile(Long id, Profile profile);
}
