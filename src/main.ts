import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { JSONP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import 'rxjs/Rx';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [JSONP_PROVIDERS, APP_ROUTER_PROVIDERS]).catch(err => console.error(err));
