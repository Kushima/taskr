import { Component, ViewContainerRef } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
  <div class="row">
    <div class="col-xs-12 brand-menu-cointainer">
      <h1>
        <i class="fa fa-tasks"></i>
        {{title}}
      </h1>

      <!--<nav>
        <a routerLink="/roadmap" routerLinkActive="active">Gerenciador</a>
      </nav>-->
    </div>
  </div>
    <router-outlet></router-outlet>
  `
  // styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Taskr';
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

}
