package COMP90082.team18.ePortfolioAPI.controller;
import COMP90082.team18.ePortfolioAPI.DTO.EduDTO;
import COMP90082.team18.ePortfolioAPI.entity.Education;
import COMP90082.team18.ePortfolioAPI.service.EduService;
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
    private EduService eduService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<EduDTO> getAllEducation(@PathVariable Long id){
        List<Education> result = eduService.getAllEducation(id);
        return modelMapper.map(result, new TypeToken<List<EduDTO>>(){}.getType());
    }

    @GetMapping("/{eduId}")
    public EduDTO getEducation(@PathVariable Long id, @PathVariable Long eduId){
        Education result = eduService.getEducation(id, eduId);
        return modelMapper.map(result, EduDTO.class);
    }

    @PostMapping
    public EduDTO postEducation(@PathVariable Long id, @RequestBody EduDTO eduDTO){
        Education result = eduService.postEducation(id, modelMapper.map(eduDTO, Education.class));
        return modelMapper.map(result, EduDTO.class);
    }

    @PostMapping("/{eduId}")
    public EduDTO postEducation(@PathVariable Long id, @PathVariable Long eduId, @RequestParam String method,
                                @RequestBody EduDTO eduDTO) throws MissingServletRequestParameterException {
        if(method.equals("put")){
            Education result = eduService.putEducation(id, eduId, modelMapper.map(eduDTO, Education.class));
            return modelMapper.map(result, EduDTO.class);
        }
        else if(method.equals("delete")){
            eduService.delEducation(id, eduId);
            return null;
        }
        else
            throw new MissingServletRequestParameterException("method", "String");

    }
}
