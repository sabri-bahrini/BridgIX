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
    {path: '/panel/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
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
            this.menuItems.push({path: '/panel/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''});
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
                    path: '/panel/project/details/' + p['id'],
                    title: p['name'],
                    icon: 'content_paste',
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
        this.inputSearch = form.value.inS;
        console.log('search : ', form.value.inS);
        this.search();
    }

    onBlure(event: Event) {
        this.inputSearch = (<HTMLInputElement>event.target).value;
        this.search();
    }

    search() {
        this.permession = false;
        this.menuItems = [{path: '/panel/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''}];
        for (let p of this.projects) {
            if (p.name.toLowerCase().indexOf(this.inputSearch.toLowerCase()) !== -1) {
                this.menuItems.push({
                    path: '/panel/project/details/' + p.id,
                    title: p.name,
                    icon: 'content_paste',
                    class: ''
                });
            }
        }
        this.permession = true;
    }

    // Test Si Affichage en Mobile ou nn
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
