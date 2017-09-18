import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FormsModule} from '@angular/forms';
import { AuthComponent } from './auth/auth.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        AuthComponent
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ]
})
export class ComponentsModule {
}
