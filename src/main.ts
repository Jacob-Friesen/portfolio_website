import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { PortfolioWebsiteAppComponent, environment } from './app/';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(PortfolioWebsiteAppComponent, [HTTP_PROVIDERS, JSONP_PROVIDERS]);

