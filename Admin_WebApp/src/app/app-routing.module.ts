import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { UsermanagerComponent } from './components/usermanager/usermanager.component';
import { GroupmanagerComponent } from './components/groupmanager/groupmanager.component';
import { UsereditComponent } from './components/useredit/useredit.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { RecipemanagerComponent } from './components/recipemanager/recipemanager.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'editprofile', component: EditprofileComponent },
      { path: 'usermanager', component: UsermanagerComponent },
      { path: 'groupmanager', component: GroupmanagerComponent },
      { path: 'recipemanager', component: RecipemanagerComponent},
      { path: 'newuser', component: NewuserComponent },
      { path: 'usermodification/:id', component: UsereditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
