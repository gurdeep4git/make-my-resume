import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormatTypes } from 'src/app/enums/format-type.enum';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';
import { Resume } from 'src/app/models/resume.model';
import { digitOnlyValidator, emailValidator } from '../validators';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {

  resumeSections = ResumeSections;

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


  constructor(
    private fb: FormBuilder,
    private router: Router
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
        }
      })
    })

    this.resume.certificationsInformation = resumeData.certificationsInformation;
    this.resume.skills = resumeData.skills.split(',').map((e: string) => e.trim());
    this.resume.interests = resumeData.interests.split(',').map((e: string) => e.trim());
    this.resume.languages = resumeData.languages.split(',').map((e: string) => e.trim());
    this.resume.formatType = FormatTypes.ONE;
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

  onDeleteClick(obj: { type: string, i: number }) {
    switch (obj.type) {
      case ResumeSections.EDUCATION_INFORMATION: this.educationInformationForm.removeAt(obj.i);
        break;
      case ResumeSections.EXPERIENCE_INFORMATION: this.experiencesForm.removeAt(obj.i);
        break;
      case ResumeSections.CERTIFICATIONS_INFORMATION: this.certificationsForm.removeAt(obj.i);
        break;
    }

  }

  onChangeIsFresher(checked: boolean): void {
    checked ? this.experiencesForm.clear() : this.experiencesForm.push(this.initExperiencesForm());
  }

  onChangeIsCertified(checked: boolean): void {
    checked ? this.certificationsForm.clear() : this.certificationsForm.push(this.initCertificationsForm());
  }

  private initForm() {
    this.resumeForm = this.fb.group({
      personalInformation: this.fb.group({
        name: [this.resume ? this.resume.personalInformation.name : 'Test', Validators.required],
        emailId: [this.resume ? this.resume.personalInformation.emailId : 'Test@test.com', [Validators.required, emailValidator]],
        phoneNumber: [this.resume ? this.resume.personalInformation.phoneNumber : '7777777777', [Validators.required, digitOnlyValidator]],
        description: [this.resume ? this.resume.personalInformation.description : 'Test Description', Validators.required]
      }),
      educationInformation: this.fb.array([this.initEducationInformationForm()]),
      experienceInformation: this.fb.group({
        isFresher: [false],
        experiences: this.fb.array([this.initExperiencesForm()])
      }),
      skills: ['HTML,CSS', Validators.required],
      certificationsInformation: this.fb.group({
        isCertified: [false],
        certifications: this.fb.array([this.initCertificationsForm()]),
      }),
      interests: ['Sports,Reading', Validators.required],
      languages: ['English', Validators.required]
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
      courseName: ['Bsc. Physical Science', Validators.required],
      institutionName: ['Test', Validators.required],
      passingYear: ['2011', Validators.required]
    })
  }

  private initExperiencesForm(): FormGroup {
    return this.fb.group({
      organizationName: ['Quovantis', Validators.required],
      projectName: ['PwC', Validators.required],
      role: ['UI Dev', Validators.required],
      tenureFrom: ['', Validators.required],
      tenureTo: ['', Validators.required],
      description: ['Test', Validators.required]
    })
  }

  private initCertificationsForm(): FormGroup {
    return this.fb.group({
      title: ['IITA', Validators.required],
      organization: ['VDF', Validators.required],

    })
  }

}

