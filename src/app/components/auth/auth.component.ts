import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProjectsService} from '../../projects.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(private projectsService: ProjectsService) {
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        const login = form.value.login;
        const password = form.value.password;
        if (login === 'admin' && password === 'admin') {
            this.projectsService.navigateDashboard();
        } else {
            alert('Erreur Login ou Mot de Passe incorrect');
            form.resetForm();
        }
    }
}
