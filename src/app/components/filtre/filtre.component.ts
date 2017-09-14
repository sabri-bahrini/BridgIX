import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {
    public open = true ;
    public openup = 'glyphicon glyphicon-menu-down pull-right';
  constructor() { }

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
}
