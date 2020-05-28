import { WorkExperience } from './work-experience.model';
import { Education } from './education.model';

export interface Introduction {
    id?: string;
    firstName: string;
    lastName: string;
    headline: string;
    industry : string;
    currentPosition?: WorkExperience;
    currentEducation?: Education;
    workingYear?: string;
    highestEducation?: string;
    gender: string;
    birthday: string;
    country: string;
    postalCode: string;
    email: string;
    phoneNumber: string;
    address: string;
    profilePhoto: string;
}
