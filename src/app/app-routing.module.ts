import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WakeOnLanComponent } from './wake-on-lan/wake-on-lan.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: "", redirectTo: '/login', pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
    { path: "wol", component: WakeOnLanComponent, canActivate: [authGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
