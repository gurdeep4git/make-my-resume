import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormatTypes } from 'src/app/enums/format-type.enum';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';
import { Certifications, EducationInformation, Experiences, Resume } from 'src/app/models/resume.model';
import { digitOnlyValidator, emailValidator } from '../validators';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {

  resumeSections = ResumeSections;
  formatTypes = FormatTypes

  resumeForm: FormGroup;
  submitted: boolean;

  personalInformationForm: FormGroup;
  educationInformationForm: FormArray;
  experienceInformationForm: FormGroup;
  experiencesForm: FormArray;
  certificationsForm: FormArray;
  certificationsInformationForm: FormGroup;
  resume: Resume;
  routerState: any;

  format: number = FormatTypes.ONE;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routerState = this.router.getCurrentNavigation()?.extras.state;
      if (this.routerState) {
        this.resume = this.routerState.resume
      }
    }

  }

  ngOnInit(): void {
    this.initForm();

    this.personalInformationForm = this.getPersonalInformationForm();
    this.educationInformationForm = this.getEducationInformationForm();
    this.experienceInformationForm = this.getExperienceInformationForm();
    this.experiencesForm = this.getExperiencesForm();
    this.certificationsInformationForm = this.getCertificationsInformationForm();
    this.certificationsForm = this.getCertifications();

    if (!!this.resume) {
      this.populateResume();
    }

  }



  onSubmit(resumeData: any): void {
    this.submitted = true;

    if (this.resumeForm.valid) {
      this.modelProcessing(resumeData);
      console.log(resumeData);

      this.router.navigateByUrl(`/preview`, {
        state: {
          resume: this.resume
        }
      })
    }

  }

  private modelProcessing(resumeData: any) {
    this.resume = new Resume();
    this.resume.personalInformation = resumeData.personalInformation;
    this.resume.educationInformation = resumeData.educationInformation;

    this.resume.experienceInformation = resumeData.experienceInformation;

    resumeData.experienceInformation.experiences.forEach((e: any, i: number) => {
      this.resume.experienceInformation.experiences.forEach((f: any, j: number) => {
        if (i == j) {
          f.description = e.description.replace(/[\n]/g, '@').split('@');
          const filteredDescription = f.description.filter((w: string, i: number) => w !== "");
          f.description = filteredDescription;
        }
      })
    })

    if (this.resume.experienceInformation.isFresher) {
      this.resume.experienceInformation.experiences.length = 0;
    }

    this.resume.certificationsInformation = resumeData.certificationsInformation;

    if (this.resume.certificationsInformation.notCertified) {
      this.resume.certificationsInformation.certifications.length = 0;
    }

    this.resume.skills = resumeData.skills.split(',').map((e: string) => e.trim());
    this.resume.interests = resumeData.interests.split(',').map((e: string) => e.trim());
    this.resume.languages = resumeData.languages.split(',').map((e: string) => e.trim());
    this.resume.formatType = +this.format;
  }

  onAddClick(type: string): void {
    switch (type) {
      case ResumeSections.EDUCATION_INFORMATION: this.educationInformationForm.push(this.initEducationInformationForm());
        break;
      case ResumeSections.EXPERIENCE_INFORMATION: this.experiencesForm.push(this.initExperiencesForm());
        break;
      case ResumeSections.CERTIFICATIONS_INFORMATION: this.certificationsForm.push(this.initCertificationsForm());
        break;
    }
  }

  onDeleteClick(obj: { type: string, index: number }) {
    switch (obj.type) {
      case ResumeSections.EDUCATION_INFORMATION: this.educationInformationForm.removeAt(obj.index);
        break;
      case ResumeSections.EXPERIENCE_INFORMATION: this.experiencesForm.removeAt(obj.index);
        break;
      case ResumeSections.CERTIFICATIONS_INFORMATION: this.certificationsForm.removeAt(obj.index);
        break;
    }

  }

  onChangeIsFresher(checked: boolean): void {
    if (!this.resume) {
      checked ? this.experiencesForm.clear() : this.experiencesForm.push(this.initExperiencesForm());
    }
  }

  onChangeIsCertified(checked: boolean): void {
    if (!this.resume) {
      checked ? this.certificationsForm.clear() : this.certificationsForm.push(this.initCertificationsForm());
    }
  }

  private initForm() {
    this.resumeForm = this.fb.group({
      personalInformation: this.fb.group({
        name: ['', Validators.required],
        designation: ['', Validators.required],
        address: ['', Validators.required],
        emailId: ['', [Validators.required, emailValidator]],
        phoneNumber: ['', [Validators.required, digitOnlyValidator]],
        description: ['', Validators.required]
      }),
      educationInformation: this.fb.array([this.initEducationInformationForm()]),
      experienceInformation: this.fb.group({
        isFresher: [false],
        experiences: this.fb.array([this.initExperiencesForm()])
      }),
      skills: ['', Validators.required],
      certificationsInformation: this.fb.group({
        notCertified: [false],
        certifications: this.fb.array([this.initCertificationsForm()]),
      }),
      interests: ['', Validators.required],
      languages: ['', Validators.required]
    })
  }

  private getCertifications(): FormArray {
    //@ts-ignore
    return this.resumeForm.get('certificationsInformation').get('certifications') as FormArray;
  }

  private getCertificationsInformationForm(): FormGroup {
    return this.resumeForm.get('certificationsInformation') as FormGroup;
  }

  private getPersonalInformationForm(): FormGroup {
    return this.resumeForm.get('personalInformation') as FormGroup;
  }

  private getEducationInformationForm(): FormArray {
    return this.resumeForm.get('educationInformation') as FormArray;
  }

  private getExperienceInformationForm(): FormGroup {
    return this.resumeForm.get('experienceInformation') as FormGroup;
  }

  private getExperiencesForm(): FormArray {
    //@ts-ignore
    return this.resumeForm.get('experienceInformation').get('experiences') as FormArray;
  }

  private initEducationInformationForm(): FormGroup {
    return this.fb.group({
      courseName: ['', Validators.required],
      institutionName: ['', Validators.required],
      passingYear: ['', Validators.required]
    })
  }

  private initExperiencesForm(): FormGroup {
    return this.fb.group({
      organizationName: ['', Validators.required],
      projectName: ['', Validators.required],
      role: ['', Validators.required],
      tenureFrom: ['', Validators.required],
      tenureTo: ['', Validators.required],
      isCurrentlyWorking: [false],
      description: ['', Validators.required]
    })
  }

  private initCertificationsForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      organization: ['', Validators.required],

    })
  }

  private populateResume(): void {
    this.format = this.resume.formatType;
    this.fillPersonalInformation();
    this.fillEducationInformation();
    this.resumeForm.get('skills')?.setValue(this.resume.skills.join(', '));
    this.resumeForm.get('interests')?.setValue(this.resume.interests.join(', '));
    this.resumeForm.get('languages')?.setValue(this.resume.languages.join(', '));
    this.fillCertificationInformation();
    this.fillExperienceInformation();
  }


  private fillExperienceInformation() {
    this.experienceInformationForm.get('isFresher')?.setValue(this.resume.experienceInformation.isFresher);
    this.experiencesForm.clear();

    if (!this.resume.experienceInformation.isFresher) {
      this.resume.experienceInformation.experiences.forEach((g: Experiences) => {
        const group = this.initExperiencesForm();
        group.get('organizationName')?.setValue(g.organizationName);
        group.get('projectName')?.setValue(g.projectName);
        group.get('role')?.setValue(g.role);
        group.get('tenureFrom')?.setValue(g.tenureFrom);
        group.get('tenureTo')?.setValue(g.tenureTo || '');
        group.get('isCurrentlyWorking')?.setValue(g.isCurrentlyWorking);

        if (g.isCurrentlyWorking) {
          group.get('tenureTo')?.disable();
        }

        group.get('description')?.setValue(g.description.join('\n'));

        this.experiencesForm.push(group);
      });
    }
  }

  private fillCertificationInformation(): void {
    this.certificationsInformationForm.get('notCertified')?.setValue(this.resume.certificationsInformation.notCertified);
    this.certificationsForm.clear();

    if (!this.resume.certificationsInformation.notCertified) {
      this.resume.certificationsInformation.certifications.forEach((g: Certifications) => {
        const group = this.initCertificationsForm();
        group.get('title')?.setValue(g.title);
        group.get('organization')?.setValue(g.organization);

        this.certificationsForm.push(group);
      });
    }
  }

  private fillEducationInformation() {
    this.educationInformationForm.clear();

    this.resume.educationInformation.forEach((g: EducationInformation) => {
      const group = this.initEducationInformationForm();
      group.get('courseName')?.setValue(g.courseName);
      group.get('institutionName')?.setValue(g.institutionName);
      group.get('passingYear')?.setValue(g.passingYear);

      this.educationInformationForm.push(group);
    });
  }

  private fillPersonalInformation() {
    this.personalInformationForm.get('name')?.setValue(this.resume.personalInformation.name);
    this.personalInformationForm.get('emailId')?.setValue(this.resume.personalInformation.emailId);
    this.personalInformationForm.get('phoneNumber')?.setValue(this.resume.personalInformation.phoneNumber);
    this.personalInformationForm.get('description')?.setValue(this.resume.personalInformation.description);
    this.personalInformationForm.get('designation')?.setValue(this.resume.personalInformation.designation);
    this.personalInformationForm.get('address')?.setValue(this.resume.personalInformation.address);
  }
}

