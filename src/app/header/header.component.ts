import { MenuService } from '../services/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  menu_opened: boolean;

  constructor(
    public menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.current_state.subscribe(state => this.menu_opened = state);
  }

  toggle_menu() {
    this.menuService.toggleMenu(!this.menu_opened);
  }
}
