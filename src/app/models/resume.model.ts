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

export class PersonalInformation {
    name: string;
    phoneNumber: string;
    emailId: string;
    description: string;
}

export class EducationInformation {
    courseName: string;
    institutionName: string;
    passingYear: string;
}

export class ExperienceInformation {
    isFresher: boolean;
    experiences: Experiences[];
}

export class Experiences {
    organizationName: string;
    tenureFrom: string;
    tenureTo?: string;
    isCurrentlyWorking: boolean;
    projectName: string;
    role: string;
    description: string[];
}

export class CertificationsInformation {
    notCertified: boolean;
    certifications: Certifications[]
}

export class Certifications {
    title: string;
    organization: string;
}
