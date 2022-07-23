import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings } from 'ngx-bootstrap-multiselect';

@Component({
  selector: 'app-skill-information',
  templateUrl: './skill-information.component.html',
  styleUrls: ['./skill-information.component.scss']
})
export class SkillInformationComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() submitted: boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
