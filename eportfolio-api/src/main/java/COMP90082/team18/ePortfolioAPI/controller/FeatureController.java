package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.FeatureDTO;
import COMP90082.team18.ePortfolioAPI.entity.Feature;
import COMP90082.team18.ePortfolioAPI.service.FeatureService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}/features")
public class FeatureController {
    @Autowired
    private FeatureService featureService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<FeatureDTO> getAllFeatures(@PathVariable Long id){
        List<Feature> result = featureService.getAllFeatures(id);
        Type listType = new TypeToken<List<FeatureDTO>>(){}.getType();
        return modelMapper.map(result, listType);
    }

    @GetMapping("/{featureId}")
    public FeatureDTO getFeature(@PathVariable Long id, @PathVariable Long featureId){
        Feature result = featureService.getFeature(id, featureId);
        return modelMapper.map(result, FeatureDTO.class);
    }

    @PostMapping
    public FeatureDTO postFeature(@PathVariable Long id, @RequestBody FeatureDTO featureDTO){
        Feature result = featureService.postFeature(id, modelMapper.map(featureDTO, Feature.class));
        return modelMapper.map(result, FeatureDTO.class);
    }

    @PutMapping("/{featureId}")
    public FeatureDTO putFeature(@PathVariable Long id,
                                 @PathVariable Long featureId,
                                 @RequestBody FeatureDTO featureDTO){
        Feature result = featureService.putFeature(id, featureId, modelMapper.map(featureDTO, Feature.class));
        return modelMapper.map(result, FeatureDTO.class);
    }
}
