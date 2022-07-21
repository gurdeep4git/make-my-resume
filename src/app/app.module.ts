import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { ResumePreviewComponent } from './components/resume-preview/resume-preview.component';
import { FormatOneComponent } from './components/formats/format-one/format-one.component';
import { FormatTwoComponent } from './components/formats/format-two/format-two.component';
import { PersonalInformationComponent } from './components/resume-form/personal-information/personal-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { EducationInformationComponent } from './components/resume-form/education-information/education-information.component';
import { ExperienceInformationComponent } from './components/resume-form/experience-information/experience-information.component';

const routes: Routes = [
  { path: 'form', component: ResumeFormComponent },
  { path: 'preview', component: ResumePreviewComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    AppComponent,
    ResumeFormComponent,
    ResumePreviewComponent,
    FormatOneComponent,
    FormatTwoComponent,
    PersonalInformationComponent,
    EducationInformationComponent,
    ExperienceInformationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
