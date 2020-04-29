package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.entity.Feature;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.FeatureRepository;
import COMP90082.team18.ePortfolioAPI.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureServiceImp implements FeatureService {
    @Autowired
    private FeatureRepository featureRepository;

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public List<Feature> getAllFeatures(Long id) {
        User targetUser = new User();
        targetUser.setId(id);
        return featureRepository.findByUser(targetUser);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public Feature getFeature(Long id, Long featureId) {
        return featureRepository.findById(featureId).orElseThrow();
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Feature postFeature(Long id, Feature feature) {
        User targetUser = new User();
        targetUser.setId(id);
        feature.setUser(targetUser);
        return featureRepository.save(feature);
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Feature putFeature(Long id, Long featureId, Feature feature) {
        Feature targetFeature = featureRepository.findById(featureId).orElseThrow();
        feature.setId(targetFeature.getId());
        feature.setUser(targetFeature.getUser());
        return featureRepository.save(feature);
    }
}
