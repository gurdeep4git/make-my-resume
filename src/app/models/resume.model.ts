import { FormatTypes } from "../enums/format-type.enum";

export class Resume {
    personalInformation: PersonalInformation;
    educationInformation: EducationInformation[];
    experienceInformation: ExperienceInformation;
    skillInformation: string[];
    interests: string[];
    formatType: FormatTypes;
}

class PersonalInformation {
    name: string;
    phoneNumber: string;
    emailId: string;
    description: string;
}

class EducationInformation {
    institutionName: string;
    passingYear: string;
}

class ExperienceInformation {
    isFresher: boolean;
    experiences: Experiences[];
}

class Experiences {
    organizationName: string;
    tenure: Tenure;
    projectName: string;
    role: string;
    description: string[];
}

class Tenure {
    from: string;
    to: string;
}
