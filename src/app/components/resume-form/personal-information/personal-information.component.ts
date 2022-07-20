import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  @Input() personalInformation: FormGroup;
  @Input() submitted: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  get personalInfoFormControl() {
    return this.personalInformation.controls;
  }

}
