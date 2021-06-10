import { FormAttributeListButtonComponent } from './form-attribute-list-button.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { getTailorMapServiceMockProvider } from '../../../../../bridge/src/tailor-map.service.mock';
import { provideMockStore } from '@ngrx/store/testing';
import { getAttributeListServiceMockMockProvider } from '../../shared/tests/test-mocks';

describe('FormAttributeListButtonComponent', () => {

  let spectator: Spectator<FormAttributeListButtonComponent>;
  const createComponent = createComponentFactory({
    component: FormAttributeListButtonComponent,
    providers: [
      provideMockStore(),
      getTailorMapServiceMockProvider(),
      getAttributeListServiceMockMockProvider(),
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

});
