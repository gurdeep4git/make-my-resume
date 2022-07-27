import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-languages-information',
  templateUrl: './languages-information.component.html',
  styleUrls: ['./languages-information.component.scss']
})
export class LanguagesInformationComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() submitted: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
