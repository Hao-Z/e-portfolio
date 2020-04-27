package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.DTO.FeatureDTO;
import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.Feature;

import java.util.List;

public interface FeatureService {
    Result<List<FeatureDTO>> getAllFeatures(Long id);

    Result<FeatureDTO> getFeature(Long id, Long featureId);

    Result<FeatureDTO> postFeature(Long id, Feature feature);

    Result<FeatureDTO> putFeature(Long id, Long featureId, Feature feature);
}
