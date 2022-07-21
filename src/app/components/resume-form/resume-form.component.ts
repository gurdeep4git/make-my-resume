import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';
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


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.personalInformationForm = this.getPersonalInformationForm();
    this.educationInformationForm = this.getEducationInformationForm();
    this.experienceInformationForm = this.getExperienceInformationForm();
    this.experiencesForm = this.getExperiencesForm();
  }

  onSubmit(resumeData: any): void {
    this.submitted = true;

    if (this.resumeForm.valid) {
      console.log(resumeData);
    }

  }

  onAddClick(type: string): void {
    switch (type) {
      case ResumeSections.EDUCATION_INFORMATION: this.educationInformationForm.push(this.initEducationInformationForm());
        break;
      case ResumeSections.EXPERIENCE_INFORMATION: this.experiencesForm.push(this.initExperiencesForm());
        break;
    }
  }

  onDeleteClick(obj: { type: string, i: number }) {
    switch (obj.type) {
      case ResumeSections.EDUCATION_INFORMATION: this.educationInformationForm.removeAt(obj.i);
        break;
      case ResumeSections.EXPERIENCE_INFORMATION: this.experiencesForm.removeAt(obj.i);
        break;
    }

  }

  onChangeIsFresher(checked: boolean): void {
    checked ? this.experiencesForm.clear() : this.experiencesForm.push(this.initExperiencesForm());
  }



  private initForm() {
    this.resumeForm = this.fb.group({
      personalInformation: this.fb.group({
        name: ['', Validators.required],
        emailId: ['', [Validators.required, emailValidator]],
        phoneNumber: ['', [Validators.required, digitOnlyValidator]],
        description: ['', Validators.required]
      }),
      educationInformation: this.fb.array([this.initEducationInformationForm()]),
      experienceInformation: this.fb.group({
        isFresher: [''],
        experiences: this.fb.array([this.initExperiencesForm()])
      })
    })
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
      description: ['', Validators.required]
    })
  }

}

