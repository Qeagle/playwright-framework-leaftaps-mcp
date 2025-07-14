import { baseConfig } from './base.config';
import { devConfig } from './dev.config';
import { qaConfig } from './qa.config';
import { prodConfig } from './prod.config';

const env = process.env.TEST_ENV || 'base'; // TEST_ENV should be set to dev/qa/prod

export function getEnvConfig() {
  switch (env) {
    case 'dev': return devConfig;
    case 'qa': return qaConfig;
    case 'prod': return prodConfig;
    default: return baseConfig;
  }
}
