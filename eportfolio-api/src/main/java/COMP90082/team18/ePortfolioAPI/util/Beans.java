package COMP90082.team18.ePortfolioAPI.util;

import COMP90082.team18.ePortfolioAPI.DTO.DTO;
import COMP90082.team18.ePortfolioAPI.entity.GenericUserData;
import COMP90082.team18.ePortfolioAPI.security.CustomPermissionEvaluator;
import org.modelmapper.*;
import org.reflections.Reflections;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.HiddenHttpMethodFilter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Component
public class Beans {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        Converter<String, LocalDate> toStringDate = new AbstractConverter<String, LocalDate>() {
            @Override
            protected LocalDate convert(String source) {
                DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                LocalDate localDate = LocalDate.parse(source, format);
                return localDate;
            }
        };

        modelMapper.addConverter(toStringDate);
        return modelMapper;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CustomPermissionEvaluator customPermissionEvaluator() {
        return new CustomPermissionEvaluator();
    }

    @Bean
    public HiddenHttpMethodFilter hiddenHttpMethodFilter() {
        return new HiddenHttpMethodFilter();
    }

    @Bean
    public Set<Class<? extends GenericUserData>> userDataEntityClasses() {
        Reflections reflections = new Reflections("COMP90082.team18.ePortfolioAPI");
        return reflections.getSubTypesOf(GenericUserData.class);

//        Alternate hard coding
//        return Arrays.asList(
//                Education.class, Feature.class, HonourAward.class, Language.class,
//                LicenseCertification.class, Project.class, Publication.class, Recommendation.class,
//                Skill.class, VolunteerExperience.class, WorkExperience.class);
    }

    @Bean
    public Set<Class<? extends DTO>> userDataDTOClasses() {
        Reflections reflections = new Reflections("COMP90082.team18.ePortfolioAPI.DTO.userDataDTO");
        return reflections.getSubTypesOf(DTO.class);

//        Alternate hard coding
//        return Arrays.asList(
//                EducationDTO.class, FeatureDTO.class, HonourAwardDTO.class, LanguageDTO.class,
//                LicenseCertificationDTO.class, ProjectDTO.class, PublicationDTO.class, RecommendationDTO.class,
//                SkillDTO.class, VolunteerExperienceDTO.class, WorkExperienceDTO.class);
    }
}
