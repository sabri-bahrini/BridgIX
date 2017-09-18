import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProjectModule} from '../modules/project.module';
import {ProjectsService} from '../projects.service';
import {INVALID} from "@angular/forms/src/model";

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
    private projects: ProjectModule[] = [];
    private filtredProjects: any[] = [];
    private autorise = false;
    private sub: any = this.route.params.subscribe(params => {
        // this.idProject = +params['id']; // (+) converts string 'id' to a number
        this.autorise = false;
        this.init();
    });

    constructor(private projectService: ProjectsService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.projects = this.projectService.getProjects();
    }

    init() {
        setTimeout(() => {
            this.searchProject(this.projectService.dataFormSearch['colaborateur'],
                this.projectService.dataFormSearch['dateD'],
                this.projectService.dataFormSearch['dateF']);
            this.autorise = true;
        }, 1000);
    }

    searchProject(colaborateur, dateD, dateF) {
        this.filtredProjects = [];
        for (let project of this.projects) {
            let res = project.calculateTab();
            let date1 = new Date(dateD);
            let date2 = new Date(dateF);
            let projectDate = new Date(project.created.substring(0, 10));
            if (!isNaN(date1.getTime()) && !isNaN(date2.getTime()) && colaborateur !== '') {
                if (project.existMembers(colaborateur) && +projectDate >= +date1 && +projectDate <= +date2) {
                    this.filtredProjects.push(
                        {
                            id: project['id'],
                            title: project['name'],
                            nbrmembre: project['_memberships'].length,
                            time: res['estimatedTime'],
                            progress: res['progrssion']
                        });
                }
            }else if (!isNaN(date1.getTime()) && !isNaN(date2.getTime())) {
                if (+projectDate >= +date1 && +projectDate <= +date2) {
                    this.filtredProjects.push(
                        {
                            id: project['id'],
                            title: project['name'],
                            nbrmembre: project['_memberships'].length,
                            time: res['estimatedTime'],
                            progress: res['progrssion']
                        });
                }
            }else if (!isNaN(date1.getTime()) && colaborateur !== '') {
                if (project.existMembers(colaborateur) && +projectDate >= +date1) {
                    this.filtredProjects.push(
                        {
                            id: project['id'],
                            title: project['name'],
                            nbrmembre: project['_memberships'].length,
                            time: res['estimatedTime'],
                            progress: res['progrssion']
                        });
                }
            }else if (!isNaN(date2.getTime()) && colaborateur !== '') {
                if (project.existMembers(colaborateur) && +projectDate <= +date2) {
                    this.filtredProjects.push(
                        {
                            id: project['id'],
                            title: project['name'],
                            nbrmembre: project['_memberships'].length,
                            time: res['estimatedTime'],
                            progress: res['progrssion']
                        });
                }
            }else if (colaborateur !== '') {
                if (project.existMembers(colaborateur)) {
                    this.filtredProjects.push(
                        {
                            id: project['id'],
                            title: project['name'],
                            nbrmembre: project['_memberships'].length,
                            time: res['estimatedTime'],
                            progress: res['progrssion']
                        });
                }
            }
        }
    }

}
