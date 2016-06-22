import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

@Component({
    selector: 'my-dashboard',
    template: `
        <h3>Auto Maintenance Tracker Dashboard</h3>
    `
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router) { };

    ngOnInit() {
    };
}
