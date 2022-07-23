import { Component, OnInit } from '@angular/core';
import { Resume } from 'src/app/models/resume.model';

@Component({
  selector: 'app-format-one',
  templateUrl: './format-one.component.html',
  styleUrls: ['./format-one.component.scss']
})
export class FormatOneComponent implements OnInit {

  resume: Resume;

  constructor() { }

  ngOnInit(): void {

  }

}
