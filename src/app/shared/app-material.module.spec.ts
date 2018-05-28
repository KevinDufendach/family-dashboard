import { AppMaterialModule } from './app-material.module';

describe('AppMaterialModule', () => {
  let materialSharedModule: AppMaterialModule;

  beforeEach(() => {
    materialSharedModule = new AppMaterialModule();
  });

  it('should create an instance', () => {
    expect(materialSharedModule).toBeTruthy();
  });
});
