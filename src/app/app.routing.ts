import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {ProjectformComponent} from './components/projectform/projectform.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    // {path: 'project', component: ProjectDetailsComponent},
    {path: 'project/add', component: ProjectformComponent},
    {path: 'project/details/:id', component: ProjectDetailsComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
