import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
