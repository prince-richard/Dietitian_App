import { Directive, Input, TemplateRef, ViewContainerRef, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Directive({
  selector: '[snaAccess]'
})


export class snaAccess {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private JwtHelper: JwtHelperService) { }

 

  @Input() set snaAccess(role: string[]) {
     let token = sessionStorage.getItem('token');
  let token_roles: any;
    //console.log(role);
    if (token) {
      token_roles = this.JwtHelper.decodeToken(token).role;
    }

    if (token_roles) {
      for (var r in role) {
        if (token_roles.includes(role[r])) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          break;
        } else {
          this.viewContainer.clear();
        }
      }

    }
    else {
      this.viewContainer.clear();
    }

  }

  
}


@Injectable()
export class SnaAccessService {
  constructor(
    private JwtHelper: JwtHelperService) { }

  hasRole(role: string) {
    let token = sessionStorage.getItem('token');
   let token_roles: any;
    if (token) {
      token_roles = this.JwtHelper.decodeToken(token).role;
      if (token_roles.includes(role)) {
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  }
}
