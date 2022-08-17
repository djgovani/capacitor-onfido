import { WebPlugin } from '@capacitor/core';

import type { OnfidoPlugin } from './definitions';

export class OnfidoWeb extends WebPlugin implements OnfidoPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
