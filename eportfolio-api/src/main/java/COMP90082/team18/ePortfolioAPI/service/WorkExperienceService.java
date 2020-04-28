package COMP90082.team18.ePortfolioAPI.service;

import COMP90082.team18.ePortfolioAPI.entity.WorkExperience;

import java.util.List;

public interface WorkExperienceService {
    List<WorkExperience> getAllWorkExperiences(Long id);

    WorkExperience getWorkExperience(Long id, Long workExperiencesId);

    WorkExperience postWorkExperience(Long id, WorkExperience workExperience);

    WorkExperience putWorkExperience(Long id, Long workExperiencesId, WorkExperience workExperience);
}
