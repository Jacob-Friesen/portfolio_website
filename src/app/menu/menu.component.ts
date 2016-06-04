import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
export class MenuComponent {
  items: Array<any>;
  menuOpen: Boolean;
  isMobile: Boolean;

  constructor() {
    var iconPrefix = 'fa fa-';
    var menuAppend = '-menu-item';

    this.items = [
      { title: 'Home', route: '/home', id: `home${menuAppend}`, iconClass: `${iconPrefix}home` },
      { title: 'Experience', route: '/experience', id: `experience${menuAppend}`, iconClass: `${iconPrefix}briefcase` },
      { title: 'Skills', route: '/skills', id: `skills${menuAppend}`, iconClass: `${iconPrefix}star` },
      { title: 'Code', route: '/demos', id: `demos${menuAppend}`, iconClass: `${iconPrefix}code` },
      { title: 'Blog', route: '/blog', id: `blog${menuAppend}`, iconClass: `${iconPrefix}comment` },
      { title: 'Resume', route: '/resume', id: `resume${menuAppend}`, iconClass: `${iconPrefix}file-text` }
    ];

    this.initializeMobile();
  }

  initializeMobile() {
    this.isMobile = this.getWindowSize().width < 651;
    this.menuOpen = !this.isMobile;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }

  getHash() {
    return window.location.pathname;
  }

  getWindowSize() {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }
}