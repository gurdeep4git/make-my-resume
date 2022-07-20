import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-education-information',
  templateUrl: './education-information.component.html',
  styleUrls: ['./education-information.component.scss']
})
export class EducationInformationComponent implements OnInit {

  @Input() educationInformation: FormArray;
  @Input() submitted: boolean;
  @Output() deleteClickEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.educationInformation);
  }

  onDelete(index: number) {
    this.deleteClickEvent.emit(index);
  }

}
