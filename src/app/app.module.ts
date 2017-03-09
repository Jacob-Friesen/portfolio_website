import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { HomeComponent } from './+home';
import { ExperienceComponent } from './+experience';
import { SkillsetComponent } from './+skills/skillset';
import { SkillsComponent } from './+skills';
import { DemosComponent } from './+demos';
import { LightboxComponent } from './lightbox';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExperienceComponent,
    SkillsetComponent,
    SkillsComponent,
    LightboxComponent,
    DemosComponent,
    MenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
