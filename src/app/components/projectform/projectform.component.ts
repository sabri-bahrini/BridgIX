import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProjectModule} from '../../modules/project.module';
import {ProjectsService} from '../../projects.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-projectform',
    templateUrl: './projectform.component.html',
    styleUrls: ['./projectform.component.scss']
})
export class ProjectformComponent implements OnInit, OnDestroy {
    private autorisation = false;
    private editDisabled = false;
    private pageCantent;
    private idProject;
    private projects: ProjectModule[] = [];
    private myProject: ProjectModule;
    private sub: any = this.route.params.subscribe(params => {
        if (params['id']) {
            this.idProject = +params['id'];
        } else {
            this.idProject = '';
        }
        // (+) converts string 'id' to a number
        this.init();
    });

    constructor(private projectService: ProjectsService, private route: ActivatedRoute) {
        this.projects = this.projectService.getProjects();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    init() {
        if (this.idProject !== '') {
            this.myProject = this.projectService.getProject(this.idProject);
            this.pageCantent = {
                title: 'Modifier ' + this.myProject.name,
                description: 'Modifier votre projet',
                etat: 'Modifier'
            };
            this.editDisabled = true;
            // console.log('im in edit page', this.idProject);
        } else {
            this.pageCantent = {title: 'Nouveau projet', description: 'Ajouter votre nouveau projet', etat: 'Ajouter'};
            this.myProject = new ProjectModule('', '', '', '', '', '', '');
            // console.log('im in add page');
        }
        setTimeout(() => {
            this.autorisation = true;
        }, 500);
    }

    onSubmit(form: NgForm) {
        if (this.idProject !== '') {
            let name = this.myProject.name;
            let description = this.myProject.description;
            if (form.value.name !== '') {
                name = form.value.name;
            }
            if (form.value.desc !== '') {
                description = form.value.desc;
            }
            let value = {name: name, description: description };
            let p = {project: value};
            this.projectService.editProject(this.idProject, p)
                .subscribe(
                    (response) => console.log(response),
                    (error) => console.log(error)
                );
            console.log(' Edit - ', p);
        }else {
            let value = {name: form.value.name, identifier: form.value.identifier, description: form.value.desc };
            let p = {project: value};
            console.log(' Add - ', p);
            this.projectService.addProject(p)
                .subscribe(
                    (response) => console.log(response),
                    (error) => console.log(error)
                );
        }
    }

}
