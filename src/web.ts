import { WebPlugin } from '@capacitor/core';

import { OnfidoCaptureType, OnfidoConfig, OnfidoDocumentType, OnfidoPlugin } from './definitions';

export class OnfidoWeb extends WebPlugin implements OnfidoPlugin {
  async start(config: OnfidoConfig): Promise<any> {
    if (!config) {
      return this.configError('config is missing');
    }

    if (!config.sdkToken) {
      return this.configError('sdkToken is missing');
    }

    if (!config.flowSteps) {
      return this.configError('flowSteps configuration is missing');
    }

    if (config.flowSteps.captureDocument) {
      if (config.flowSteps.captureDocument.docType && config.flowSteps.captureDocument.countryCode) {
        return this.configError(
          'countryCode needs to be a ISO 3166-1 3 letter code if docType is specified',
        );
      }

      if (!config.flowSteps.captureDocument.docType && config.flowSteps.captureDocument.countryCode) {
        return this.configError(
          'docType needs to be provided if countryCode is specified',
        );
      }

      if (config.flowSteps.captureDocument.docType && !(config.flowSteps.captureDocument.docType in OnfidoDocumentType)) {
        return this.configError('docType is invalid');
      }
    }

    if (!config.flowSteps.captureDocument && !config.flowSteps.captureFace) {
      return this.configError(
        "flowSteps doesn't include either valid captureDocument options or valid captureFace options",
      );
    }

    if (config.flowSteps.captureFace && !(config.flowSteps.captureFace.type in OnfidoCaptureType)) {
      return this.configError('Capture Face type is invalid');
    }

    return null as any;
  }

  configError(message: string) {
    const error = new Error(message);
    error.name = 'config_error';
    console.log(error);
    return Promise.reject(error);
  }
}
