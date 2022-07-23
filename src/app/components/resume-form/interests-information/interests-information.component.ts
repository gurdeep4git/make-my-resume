import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interests-information',
  templateUrl: './interests-information.component.html',
  styleUrls: ['./interests-information.component.scss']
})
export class InterestsInformationComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() submitted: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
