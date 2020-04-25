package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.DTO.AboutDTO;
import COMP90082.team18.ePortfolioAPI.DTO.IntroductionDTO;
import COMP90082.team18.ePortfolioAPI.DTO.ProfileDTO;
import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.Profile;

public interface ProfileService {
    Result<ProfileDTO> getProfile(Long id);

    Result<ProfileDTO> patchProfile(Long id, Profile profile);

    Result<IntroductionDTO> getIntroduction(Long id);

    Result<IntroductionDTO> patchIntroduction(Long id, Profile profile);

    Result<AboutDTO> getAbout(Long id);

    Result<AboutDTO> patchAbout(Long id, Profile profile);
}
