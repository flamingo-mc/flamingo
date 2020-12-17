import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatIconModule,
  MatIconRegistry,
} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';
import { ApiModule } from './generated';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { TreeComponent } from './tree/tree.component';
import { OverlayComponent } from './overlay-service/overlay/overlay.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { environment } from '../../../../bridge/src/environments/environment';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    DialogCloseButtonComponent,
    TreeComponent,
    OverlayComponent,
  ],
  imports: [
    ApiModule.forRoot({
        rootUrl: window.location.origin + '/viewer/action/proxyrest?url=',
    }),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatSliderModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatListModule,
    MatSortModule,
    HttpClientModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    DragDropModule,
    MatDatepickerModule,
  ],
  exports: [
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTreeModule,
        MatIconModule,
        MatFormFieldModule,
        MatTabsModule,
        MatInputModule,
        MatTooltipModule,
        MatSortModule,
        MatSelectModule,
        MatGridListModule,
        MatSliderModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatListModule,
        HttpClientModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatDialogModule,
        DialogCloseButtonComponent,
        TreeComponent,
        MatRadioModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        DragDropModule,
        MatDatepickerModule,
        ConfirmDialogComponent,
    ],
  entryComponents: [],
  providers: [
    ConfirmDialogService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        ...MAT_MOMENT_DATE_FORMATS,
        display: {
          ...MAT_MOMENT_DATE_FORMATS.parse,
          dateInput: 'DD-MM-YYYY',
        },
      },
    },
  ],
})
export class SharedModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {

    const basePath = environment.basePath;
    const url = `${basePath}/assets/core/imgs/`;
    const icons = [
      'draw_polygon', 'draw_line', 'draw_point', 'split', 'new_object', 'merge',
      'contextual_drag', 'contextual_chevron_bottom', 'contextual_chevron_left', 'contextual_chevron_right', 'contextual_chevron_top',
      'interface_trash_filled',
    ];
    icons.forEach(value => {
      this.matIconRegistry.addSvgIcon(
        value,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          url
          + value + '.svg'),
      );

    });
  }
}
