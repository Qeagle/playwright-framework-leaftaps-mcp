import { baseConfig } from './base.config';

export const prodConfig = {
  ...baseConfig,
  baseURL: 'http://leaftaps.com/opentaps/control/main',
  username: 'demosalesmanager',
  password: 'crmsfa',
  headless: true
};
