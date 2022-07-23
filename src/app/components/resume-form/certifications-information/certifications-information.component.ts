import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ResumeSections } from 'src/app/enums/resume-sections.enum';

@Component({
  selector: 'app-certifications-information',
  templateUrl: './certifications-information.component.html',
  styleUrls: ['./certifications-information.component.scss']
})
export class CertificationsInformationComponent implements OnInit {

  @Input() certificationsInformation: FormGroup;
  @Output() addClickEvent = new EventEmitter<string>();
  @Output() deleteClickEvent = new EventEmitter();
  @Output() changeEvent = new EventEmitter();

  resumeSections = ResumeSections;
  certifications: FormArray;
  showCertifications: boolean;

  constructor() { }

  ngOnInit(): void {
    this.certifications = this.certificationsInformation.get('certifications') as FormArray;
  }

  onAddClick(type: string) {
    this.addClickEvent.emit(type);
  }

  onDelete(index: number, type: string) {
    this.deleteClickEvent.emit({ index, type });
  }

  onChange(checked: boolean) {
    this.showCertifications = checked;
    this.changeEvent.emit(checked);
  }

}
