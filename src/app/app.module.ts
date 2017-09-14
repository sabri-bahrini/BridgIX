import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {JsonpModule} from '@angular/http';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';


import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {FiltreComponent} from './components/filtre/filtre.component';
import {ProjectformComponent} from './components/projectform/projectform.component';
import {ChartsModule} from 'ng2-charts';
import {ProjectsService} from './projects.service';
import {DataStorageService} from './Data.service';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ProjectDetailsComponent,
        ProjectformComponent,
        FiltreComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        ChartsModule
    ],
    providers: [ProjectsService, DataStorageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
