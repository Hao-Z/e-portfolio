package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.Feature;

import java.util.List;

public interface FeatureService {
    List<Feature> getAllFeatures(Long id);

    Feature getFeature(Long id, Long featureId);

    Feature postFeature(Long id, Feature feature);

    Feature putFeature(Long id, Long featureId, Feature feature);
}
