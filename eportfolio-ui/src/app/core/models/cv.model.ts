import { Introduction } from './introduction.model';
import { About } from './about.model';
import { Feature } from './feature.model';
import { WorkExperience } from './work-experience.model';
import { Education } from './education.model';
import { LicenseCertification } from './license-certification.model';
import { VolunteerExperience } from './volunteer-experience.model';
import { Skill } from './skill.model';
import { Project } from './project.model';
import { HonourAward } from './honour-award.model';
import { Publication } from './publication.model';
import { Language } from './language.model';
import { Recommendation } from './recommendation.model';

export interface Cv {
    introduction: Introduction;
    about: About;
    feature: Feature[];
    workExperience: WorkExperience[];
    education: Education[];
    licenseCertification: LicenseCertification[];
    volunteerExperience: VolunteerExperience[];
    skill: Skill[];
    project: Project[];
    honourAward: HonourAward[];
    publication: Publication[];
    language: Language[];
    recommendation: Recommendation[];
}