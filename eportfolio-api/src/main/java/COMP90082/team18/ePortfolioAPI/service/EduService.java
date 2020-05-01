package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.Education;

import java.util.List;

public interface EduService {

    List<Education> getAllEducation(Long id);

    Education getEducation(Long id, Long eduId);

    Education postEducation(Long id, Education education);

    Education putEducation(Long id, Long eduId, Education education);

    void delEducation(Long id, Long eduId);
}
