import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: AppComponent,
        useAsDefault: true
    }, {
        // path: '/heroes',
        // name: 'Heroes',
        // component: HeroesComponent
    }, {
        // path: '/heroes/:id',
        // name: 'HeroDetail',
        // component: HeroDetailComponent
    }
])
@Component({
    selector: 'amt-app',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS],
    template: `
        <h1>{{title}}</h1>
    `
})
export class AppComponent {
    title: string = 'Auto Maintenance Tracker';

    constructor() {
    }
}
