import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu_opened: boolean;

    constructor(private menuService: MenuService) { }
    
    ngOnInit() {
      this.menuService.current_state.subscribe(state =>  this.menu_opened = state );
    }

}
