import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {

  resumeSections = ResumeSections;

  resumeForm: FormGroup;
  personalInformationForm: FormGroup;
  submitted: boolean;
  educationInformationForm: FormArray;


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.personalInformationForm = this.getPersonalInformationForm();
    this.educationInformationForm = this.getEducationInformationForm();
  }

  onSubmit(resumeData: any): void {
    this.submitted = true;

    if (this.resumeForm.valid) {
      console.log(resumeData);
    }

  }

  onAddEducationInfo() {
    this.educationInformationForm.push(this.initEducationInformationForm());
  }

  onDeleteEducationInfo(i: number) {
    this.educationInformationForm.removeAt(i);
  }

  private initForm() {
    this.resumeForm = this.fb.group({
      personalInformation: this.fb.group({
        name: ['', Validators.required],
        emailId: ['', [Validators.required, this.emailValidator]],
        phoneNumber: ['', Validators.required],
      }),
      educationInformation: this.fb.array([this.initEducationInformationForm()])
    })
  }


  private getPersonalInformationForm(): FormGroup {
    return this.resumeForm.get('personalInformation') as FormGroup;
  }

  private getEducationInformationForm(): FormArray {
    return this.resumeForm.get('educationInformation') as FormArray;
  }

  private initEducationInformationForm(): FormGroup {
    return this.fb.group({
      institutionName: ['', Validators.required],
      passingYear: ['', Validators.required]
    })
  }

  private emailValidator(control: FormControl) {
    const email = control.value;
    if (email.includes('@')) {
      return null;
    }
    return {
      emailInValid: true
    }
  }

}

