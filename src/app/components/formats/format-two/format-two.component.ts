import { Component, OnInit } from '@angular/core';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';
import { Resume } from 'src/app/models/resume.model';

@Component({
  selector: 'app-format-two',
  templateUrl: './format-two.component.html',
  styleUrls: ['./format-two.component.scss']
})
export class FormatTwoComponent implements OnInit {

  resume: Resume;
  resumeSections = ResumeSections;

  constructor() { }

  ngOnInit(): void {
  }

}
