package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.DTO.FeatureDTO;
import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.Feature;
import COMP90082.team18.ePortfolioAPI.entity.User;
import COMP90082.team18.ePortfolioAPI.repository.FeatureRepository;
import COMP90082.team18.ePortfolioAPI.repository.UserRepository;
import COMP90082.team18.ePortfolioAPI.service.FeatureService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class FeatureServiceImp implements FeatureService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FeatureRepository featureRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public Result<List<FeatureDTO>> getAllFeatures(Long id) {
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser == null) {
            return new Result<>("404 not found", false, null);
        } else {
            List<Feature> features = featureRepository.findByUser(targetUser);
            Type listType = new TypeToken<List<FeatureDTO>>(){}.getType();
            return new Result<List<FeatureDTO>>("200 ok", true, modelMapper.map(features, listType));
        }
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'read')")
    public Result<FeatureDTO> getFeature(Long id, Long featureId) {
        Feature targetFeature = featureRepository.findById(featureId).orElse(null);
        if (targetFeature == null) {
            return new Result<>("404 not found", false, null);
        } else {
            return new Result<FeatureDTO>("200 ok", true, modelMapper.map(targetFeature, FeatureDTO.class));
        }
    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Result<FeatureDTO> postFeature(Long id, Feature feature) {
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser == null) {
            return new Result<>("404 not found", false, null);
        } else {
            feature.setUser(targetUser);
            Feature returnedFeature =  featureRepository.save(feature);
            return new Result<FeatureDTO>("200 ok", true, modelMapper.map(returnedFeature, FeatureDTO.class));
        }

    }

    @Override
    @PreAuthorize("hasPermission(#id, 'write')")
    public Result<FeatureDTO> putFeature(Long id, Long featureId, Feature feature) {
        Feature targetFeature = featureRepository.findById(featureId).orElse(null);
        if (targetFeature == null) {
            return new Result<>("404 not found", false, null);
        } else {
            feature.setId(featureId);
            feature.setUser(targetFeature.getUser());
            Feature returnedFeature =  featureRepository.save(feature);
            return new Result<FeatureDTO>("200 ok", true, modelMapper.map(returnedFeature, FeatureDTO.class));
        }
    }
}
