import { createAction, props } from '@ngrx/store';
import {
  AppLayer,
  Level,
  SelectedContentItem,
} from '../../../../../bridge/typings';

const applicationActionsPrefix = '[Application]';

export const setApplicationContent = createAction(
  `${applicationActionsPrefix} Set Application Content`,
  props<{ root: SelectedContentItem[], levels: Level[], layers: AppLayer[] }>(),
);
