import { registerPlugin } from '@capacitor/core';

import type { OnfidoPlugin } from './definitions';

const Onfido = registerPlugin<OnfidoPlugin>('Onfido', {
  web: () => import('./web').then(m => new m.OnfidoWeb()),
});

export * from './definitions';
export { Onfido };
