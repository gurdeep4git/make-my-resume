import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormatOneComponent } from '../formats/format-one/format-one.component';
import { FormatTwoComponent } from '../formats/format-two/format-two.component';
import { Location } from '@angular/common';
import { Resume } from 'src/app/models/resume.model';
import { FormatTypes } from 'src/app/enums/format-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-preview',
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit, AfterViewInit, AfterViewChecked {


  resume: Resume;
  routerState: any;

  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
    //private location: Location,
    private router: Router
  ) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routerState = this.router.getCurrentNavigation()?.extras.state;
      if (this.routerState) {
        this.resume = this.routerState.resume
      }
    }

  }

  ngOnInit(): void {
    //@ts-ignore
    //this.resume = this.location.getState();
    this.resume = {
      "personalInformation": {
        "name": "Test",
        "emailId": "Test@test.com",
        "phoneNumber": "7777777777",
        "description": "Test Description"
      },
      "educationInformation": [
        {
          "institutionName": "Test",
          "passingYear": "2011"
        }
      ],
      "experienceInformation": {
        "isFresher": false,
        "experiences": [
          {
            "organizationName": "Quovantis",
            "projectName": "PwC",
            "role": "UI Dev",
            "tenureFrom": "2022-07-04T11:38:49.000Z",
            "tenureTo": "2022-07-06T11:38:49.000Z",
            "description": [
              "Test",
              "Test 1"
            ]
          }
        ]
      },
      "certificationsInformation": {
        "isCertified": false,
        "certifications": [
          {
            "title": "IITA",
            "organization": "VDF"
          }
        ]
      },
      "skills": [
        "HTML",
        "CSS"
      ],
      "interests": [
        "Sports",
        "Reading"
      ],
      "formatType": 1
    }
  }

  onEdit() {
    this.router.navigateByUrl(`/form`, {
      state: {
        resume: this.resume
      }
    })
  }

  ngAfterViewInit() {

    let componentFactory: ComponentFactory<any>;

    if (this.resume.formatType === FormatTypes.ONE) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormatOneComponent);
    } else {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormatTwoComponent);
    }

    this.dynamicInsert.clear();
    const dynamicComponent = this.dynamicInsert.createComponent(componentFactory).instance;
    dynamicComponent.resume = this.resume;
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}
