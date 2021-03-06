import { Component } from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularSSOTestApp';

  constructor(private oauthService: OAuthService ) {
    this.configureSingleSignOn();
  }

  // These configurations must be loaded while the component is being created.
  configureSingleSignOn(): any {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // This does NOT us to the login page whenever we're not logged in, but we can go to the login page using the commented out login
    // function
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // This redirects us to the login page whenever we're not logged in.
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  // login(): any {
  //   this.oauthService.initImplicitFlow();
  // }
  //
  logout(): any {
    this.oauthService.logOut();
  }

  // To ensure you can only see the home component if you log in.
  // This is called a get accessor function.
  get token(): any {
    let claims: any = this.oauthService.getIdentityClaims();
    // If the login was successful, we will return the claims. Otherwise we return null.
    return claims ? claims : null;
  }
}
