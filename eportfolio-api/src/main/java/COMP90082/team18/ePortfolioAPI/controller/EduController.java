package COMP90082.team18.ePortfolioAPI.controller;
import COMP90082.team18.ePortfolioAPI.DTO.EducationDTO;
import COMP90082.team18.ePortfolioAPI.entity.Education;
import COMP90082.team18.ePortfolioAPI.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}/educations")
public class EduController {

    @Autowired
    private EducationService educationService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<EducationDTO> getAllEducation(@PathVariable Long id){
        List<Education> result = educationService.getAllEducation(id);
        return modelMapper.map(result, new TypeToken<List<EducationDTO>>(){}.getType());
    }

    @GetMapping("/{eduId}")
    public EducationDTO getEducation(@PathVariable Long id, @PathVariable Long eduId){
        Education result = educationService.getEducation(id, eduId);
        return modelMapper.map(result, EducationDTO.class);
    }

    @PostMapping
    public EducationDTO postEducation(@PathVariable Long id, @RequestBody EducationDTO educationDTO){
        Education result = educationService.postEducation(id, modelMapper.map(educationDTO, Education.class));
        return modelMapper.map(result, EducationDTO.class);
    }

    @PostMapping("/{eduId}")
    public EducationDTO postEducation(@PathVariable Long id, @PathVariable Long eduId, @RequestParam String method,
                                      @RequestBody EducationDTO educationDTO) throws MissingServletRequestParameterException {
        if(method.equals("put")){
            Education result = educationService.putEducation(id, eduId, modelMapper.map(educationDTO, Education.class));
            return modelMapper.map(result, EducationDTO.class);
        }
        else if(method.equals("delete")){
            educationService.delEducation(id, eduId);
            return null;
        }
        else
            throw new MissingServletRequestParameterException("method", "String");

    }
}
