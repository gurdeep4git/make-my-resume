import { FormatTypes } from "../enums/format-type.enum";

export class Resume {
    personalInformation: PersonalInformation;
    educationInformation: EducationInformation[];
    experienceInformation: ExperienceInformation;
    skills: string[];
    certificationsInformation: CertificationsInformation;
    interests: string[];
    languages: string[];
    formatType: FormatTypes;
}

class PersonalInformation {
    name: string;
    phoneNumber: string;
    emailId: string;
    description: string;
}

class EducationInformation {
    courseName: string;
    institutionName: string;
    passingYear: string;
}

class ExperienceInformation {
    isFresher: boolean;
    experiences: Experiences[];
}

class Experiences {
    organizationName: string;
    tenureFrom: string;
    tenureTo?: string;
    isCurrentlyWorking: boolean;
    projectName: string;
    role: string;
    description: string[];
}

class CertificationsInformation {
    isCertified: boolean;
    certifications: Certifications[]
}

class Certifications {
    title: string;
    organization: string;
}
