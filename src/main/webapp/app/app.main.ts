import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { FireappCafeAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(FireappCafeAppModule, { preserveWhitespaces: true })
    // eslint-disable-next-line no-console
    .then(() => console.log('Application started'))
    .catch(err => console.error(err));
});

// platformBrowserDynamic()
//   .bootstrapModule(FireappCafeAppModule)
//   .then(ref => {
//     if (window['ngRef']) {
//       window['ngRef'].destroy();
//     }
//     window['ngRef'] = ref;

//   })
//   .catch(err => console.error(err));
