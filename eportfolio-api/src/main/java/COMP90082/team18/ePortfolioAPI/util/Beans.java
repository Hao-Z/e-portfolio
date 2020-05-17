package COMP90082.team18.ePortfolioAPI.util;

import COMP90082.team18.ePortfolioAPI.security.CustomPermissionEvaluator;
import org.modelmapper.*;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.HiddenHttpMethodFilter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
    public HiddenHttpMethodFilter hiddenHttpMethodFilter(){
        return new HiddenHttpMethodFilter();
    }
}
