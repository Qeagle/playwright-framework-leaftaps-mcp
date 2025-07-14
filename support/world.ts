import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';

export class CustomWorld extends World {
page!: Page;
  leadData: any;
  constructor(options: IWorldOptions) {
    super(options);
  }
}
setWorldConstructor(CustomWorld);
