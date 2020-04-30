package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.Profile;

public interface ProfileService {
    Profile getProfile(Long id);

    Profile patchProfile(Long id, Profile profile);
}
