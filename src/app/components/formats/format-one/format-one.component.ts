import { Component, OnInit } from '@angular/core';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';
import { Resume } from 'src/app/models/resume.model';

@Component({
  selector: 'app-format-one',
  templateUrl: './format-one.component.html',
  styleUrls: ['./format-one.component.scss']
})
export class FormatOneComponent implements OnInit {

  resume: Resume;
  resumeSections = ResumeSections;


  constructor() { }

  ngOnInit(): void {

  }

}
