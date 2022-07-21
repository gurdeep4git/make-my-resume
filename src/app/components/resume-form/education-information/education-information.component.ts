import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';

@Component({
  selector: 'app-education-information',
  templateUrl: './education-information.component.html',
  styleUrls: ['./education-information.component.scss']
})
export class EducationInformationComponent implements OnInit {

  @Input() educationInformation: FormArray;
  @Input() submitted: boolean;
  @Output() deleteClickEvent = new EventEmitter();
  @Output() addClickEvent = new EventEmitter<string>();


  resumeSections = ResumeSections;

  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(type: string): void {
    this.addClickEvent.emit(type);
  }

  onDelete(index: number, type: string) {
    this.deleteClickEvent.emit({ index, type });
  }

}
