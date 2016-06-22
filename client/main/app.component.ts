import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard.component';

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    // }, {
    //     // path: '/vehicles',
    //     // name: 'Vehicles',
    //     // component: VehiclesComponent
    // }, {
    //     // path: '/vehicles/:id',
    //     // name: 'VehicleDetail',
    //     // component: VehicleDetailComponent
    }
])
@Component({
    selector: 'amt-app',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS],
    template: `
        <h1>{{title}}</h1>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title: string = 'Auto Maintenance Tracker';
}
