import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';

@Component({
  selector: 'app-experience-information',
  templateUrl: './experience-information.component.html',
  styleUrls: ['./experience-information.component.scss']
})
export class ExperienceInformationComponent implements OnInit {

  @Input() experienceInformation: FormGroup;
  @Input() submitted: boolean;

  @Output() addClickEvent = new EventEmitter<string>();
  @Output() deleteClickEvent = new EventEmitter();
  @Output() changeEvent = new EventEmitter();

  bsValue: Date;
  experiences: FormArray;
  resumeSections = ResumeSections;
  showExperiences: boolean;


  constructor() { }

  ngOnInit(): void {
    this.bsValue = new Date();
    this.experiences = this.experienceInformation.get('experiences') as FormArray;
  }

  onAddClick(type: string): void {
    this.addClickEvent.emit(type);
  }

  onDelete(index: number, type: string) {
    this.deleteClickEvent.emit({ index, type });
  }

  onChange(checked: boolean) {
    this.showExperiences = checked;
    this.changeEvent.emit(checked);
  }

  onIsCurrentlyWorkingChange(checked: boolean, index: number) {
    const tenureToControl = this.experiences.controls[index].get('tenureTo');
    if (checked) {
      tenureToControl?.disable();
      tenureToControl?.clearValidators();
    } else {
      tenureToControl?.enable();
      tenureToControl?.setValidators([Validators.required]);
    }
    tenureToControl?.updateValueAndValidity();
  }

}
