import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ProjectsService} from '../../projects.service';


@Component({
    selector: 'app-filtre',
    templateUrl: './filtre.component.html',
    styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {
    public open = true;
    public openup = 'glyphicon glyphicon-menu-down pull-right';
    public users: any[] = [];

    constructor(private projectService: ProjectsService, private router: Router) {
        setTimeout(() => {
            this.users = this.projectService.getUsers();
        }, 500);
    }

    ngOnInit() {
    }

    onClick() {
        this.open = !this.open;
        if (!this.open) {
            this.openup = 'glyphicon glyphicon-menu-up pull-right';
        } else {
            this.openup = 'glyphicon glyphicon-menu-down pull-right';
        }
    }

    onSubmit(form: NgForm) {
        this.projectService.setDataFormSerch(form.value.dateD, form.value.dateF, form.value.colaborateur);
        this.projectService.navigatePanel();
        setTimeout(() => {
            this.projectService.navigateSearch();
        }, 500);

    }
}
