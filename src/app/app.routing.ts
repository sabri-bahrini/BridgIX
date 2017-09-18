import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {ProjectformComponent} from './components/projectform/projectform.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {PanelComponent} from './panel/panel.component';
import {AuthComponent} from './components/auth/auth.component';

const routes: Routes = [
    {
        path: 'panel', component: PanelComponent, children:
        [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'project/add', component: ProjectformComponent},
            {path: 'project/edit/:id', component: ProjectformComponent},
            {path: 'project/details/:id', component: ProjectDetailsComponent},
            {path: 'search', component: ProjectListComponent}
        ]
    },
    {path: 'signin', component: AuthComponent},
    {path: '', redirectTo: '/signin', pathMatch: 'full'}
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
