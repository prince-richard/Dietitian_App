import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { snaAlertComponent, snaAlertService } from './modules/sna-alert/snaAlertModule';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HomeComponent } from './components/home/home.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { UsermanagerComponent } from './components/usermanager/usermanager.component';
import { UsereditComponent } from './components/useredit/useredit.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { GroupmanagerComponent } from './components/groupmanager/groupmanager.component';
import { GroupeditComponent } from './components/groupedit/groupedit.component';
import { RecipemanagerComponent } from './components/recipemanager/recipemanager.component';
import { RecipeeditComponent }from './components/recipeedit/recipeedit.component';
import { RmtestComponent } from './components/rmtest/rmtest.component';
import { TestComponent } from './components/test/test.component';



//service
import { AccountService } from './components/login/account.service';
import { TokenService } from './components/login/token.service';
import { LoadingSpinnerService } from './components/loading-spinner/loading-spinner.service'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth-guard.service';
import { EditprofileService } from './components/editprofile/editprofile.service';
import { UsermanagerService } from './components/usermanager/usermanager.service';

//directive, module
import { snaAccess, SnaAccessService } from './directives/sna-access.directive';
import { RecipemanagerService } from './components/recipemanager/recipemanager.service';
import { MessageMonitorComponent } from './components/message-monitor/message-monitor.component';






export function getToken(){
  return sessionStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    snaAccess,
    EditprofileComponent,
    UsermanagerComponent,
    UsereditComponent,
    NewuserComponent,
    snaAlertComponent,
    ResetpasswordComponent,
    GroupmanagerComponent,
    RecipemanagerComponent,
    GroupeditComponent,
    RecipeeditComponent,
    RmtestComponent,
    TestComponent,
    MessageMonitorComponent,
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ["localhost:4200"]
      }
    })
  ],
  providers: [
    AccountService,
    EditprofileService,
    TokenService,
    LoadingSpinnerService,
    SnaAccessService,
    UsermanagerService,
    AuthGuard,
    NgbDropdown,
    snaAlertService,
    RecipemanagerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
