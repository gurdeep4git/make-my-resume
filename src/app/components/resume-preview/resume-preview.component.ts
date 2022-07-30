import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormatOneComponent } from '../formats/format-one/format-one.component';
import { FormatTwoComponent } from '../formats/format-two/format-two.component';
import { Resume } from 'src/app/models/resume.model';
import { FormatTypes } from 'src/app/enums/format-type.enum';
import { Router } from '@angular/router';
//@ts-ignore
import html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-resume-preview',
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnInit, AfterViewInit, AfterViewChecked {

  resume: Resume;
  routerState: any;
  formatTypes = FormatTypes;

  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
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

  onDownload() {

    const fileName = this.resume.personalInformation.name;
    const content = document.querySelector('#resumeContainer') as HTMLElement;

    const options = {
      margin: this.resume.formatType === FormatTypes.ONE ? 0.5 : 0,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(options).from(content).save();
  }



}
