package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.FeatureDTO;
import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.entity.Feature;
import COMP90082.team18.ePortfolioAPI.service.FeatureService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Result<List<FeatureDTO>> getAllFeatures(@PathVariable Long id){
        return featureService.getAllFeatures(id);
    }

    @GetMapping("/{featureId}")
    public Result<FeatureDTO> getFeature(@PathVariable Long id, @PathVariable Long featureId){
        return featureService.getFeature(id, featureId);
    }

    @PostMapping
    public Result<FeatureDTO> postFeature(@PathVariable Long id, @RequestBody FeatureDTO featureDTO){
        return featureService.postFeature(id, modelMapper.map(featureDTO, Feature.class));
    }

    @PutMapping("/{featureId}")
    public Result<FeatureDTO> putFeature(@PathVariable Long id, @PathVariable Long featureId, @RequestBody FeatureDTO featureDTO){
        return featureService.putFeature(id, featureId, modelMapper.map(featureDTO, Feature.class));
    }
}
