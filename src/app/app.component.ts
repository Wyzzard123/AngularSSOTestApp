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
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): any {
    this.oauthService.initImplicitFlow();
  }

  logout(): any {
    this.oauthService.logOut();
  }

  // To ensure you can only see the home component if you log in.
  // This is called a get accessor function.
  get token(): any {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
