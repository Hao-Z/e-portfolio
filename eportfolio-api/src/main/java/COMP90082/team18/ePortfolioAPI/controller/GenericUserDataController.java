package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.DTO;
import COMP90082.team18.ePortfolioAPI.DTO.FeatureDTO;
import COMP90082.team18.ePortfolioAPI.entity.Feature;
import COMP90082.team18.ePortfolioAPI.service.GenericUserDataService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}")
public class GenericUserDataController {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private GenericUserDataService genericUserDataService;

    private Type listType;

    private Type dtoType;

    private Type entityType;

    @GetMapping
    public List<DTO> getAll(@PathVariable Long id,
                            @PathParam("class") String targetClass,
                            @RequestBody Object object){
//        System.out.println(object);
//        System.out.println(modelMapper.map(object, FeatureDTO.class));
//        System.out.println(modelMapper.map(object, Feature.class));
//
//
        Object result = null;
        Type listType = new TypeToken<List<FeatureDTO>>(){}.getType();
        return modelMapper.map(result, listType);
    }
}
