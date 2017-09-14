import {Component, OnInit} from '@angular/core';
import {ProjectsService} from 'app/projects.service';
import {NgForm} from '@angular/forms';
import {ProjectModule} from '../../modules/project.module';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    inputSearch = '';
    permession = false;
    menuItems: any[] = [];
    private projects: ProjectModule[];

    constructor(private projectService: ProjectsService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.projects = this.projectService.getProjects();
            this.menuItems.push({path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: ''});
            this.initialiseItems();
        }, 1000);
        // this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.menuItems = this.menuItems.filter(menuItem => menuItem);
    }

    // Intialise menu Items
    initialiseItems() {
        if (this.projects.length > 0) {
            for (let p of this.projects) {
                this.menuItems.push({
                    path: '/project/details/' + p['id'],
                    title: p['name'],
                    icon: 'dashboard',
                    class: ''
                });
            }
            this.permession = true;
        } else {
            setTimeout(() => {
                console.log('Waiting data slidebar');
                this.initialiseItems();
            }, 500);
        }
    }

    // Search Element in projects list
    searchProject(form: NgForm) {
        let value = form.value.inS;
        console.log(' My search : ', value);
        // let val = form.value;
        // console.log(' variable search ', this.inputSearch);
        // for (let p of this.projects) {
        //
        // }
    }

    onBlure(event: Event) {
        this.inputSearch = (<HTMLInputElement>event.target).value;
        console.log('My serach blur :', this.inputSearch);
    }

    // Test Si Affichage en Mobile ou nn
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
