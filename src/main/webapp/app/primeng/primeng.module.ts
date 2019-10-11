import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CampacksysButtonDemoModule } from './buttons/button/buttondemo.module';
import { CampacksysSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { CampacksysDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { CampacksysConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { CampacksysLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { CampacksysTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { CampacksysOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { CampacksysSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { CampacksysKeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { CampacksysInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { CampacksysInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { CampacksysInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { CampacksysCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { CampacksysCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { CampacksysChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { CampacksysColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { CampacksysInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { CampacksysInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { CampacksysPasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { CampacksysAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { CampacksysSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { CampacksysSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { CampacksysRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { CampacksysSelectDemoModule } from './inputs/select/selectdemo.module';
import { CampacksysSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { CampacksysListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { CampacksysRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { CampacksysToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { CampacksysEditorDemoModule } from './inputs/editor/editordemo.module';

import { CampacksysMessagesDemoModule } from './messages/messages/messagesdemo.module';
import { CampacksysToastDemoModule } from './messages/toast/toastdemo.module';
import { CampacksysGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { CampacksysFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { CampacksysAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { CampacksysPanelDemoModule } from './panel/panel/paneldemo.module';
import { CampacksysTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { CampacksysFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { CampacksysToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { CampacksysScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { CampacksysCardDemoModule } from './panel/card/carddemo.module';
import { CampacksysFlexGridDemoModule } from './panel/flexgrid/flexgriddemo.module';

import { CampacksysTableDemoModule } from './data/table/tabledemo.module';
import { CampacksysVirtualScrollerDemoModule } from './data/virtualscroller/virtualscrollerdemo.module';
import { CampacksysPickListDemoModule } from './data/picklist/picklistdemo.module';
import { CampacksysOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { CampacksysFullCalendarDemoModule } from './data/fullcalendar/fullcalendardemo.module';
import { CampacksysTreeDemoModule } from './data/tree/treedemo.module';
import { CampacksysTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { CampacksysPaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { CampacksysGmapDemoModule } from './data/gmap/gmapdemo.module';
import { CampacksysOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { CampacksysCarouselDemoModule } from './data/carousel/carouseldemo.module';
import { CampacksysDataViewDemoModule } from './data/dataview/dataviewdemo.module';

import { CampacksysBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { CampacksysDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { CampacksysLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { CampacksysPiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { CampacksysPolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { CampacksysRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { CampacksysDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { CampacksysMenuDemoModule } from './menu/menu/menudemo.module';
import { CampacksysContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { CampacksysPanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { CampacksysStepsDemoModule } from './menu/steps/stepsdemo.module';
import { CampacksysTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { CampacksysBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { CampacksysMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { CampacksysMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { CampacksysSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { CampacksysTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { CampacksysBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { CampacksysCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { CampacksysDeferDemoModule } from './misc/defer/deferdemo.module';
import { CampacksysInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { CampacksysProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { CampacksysRTLDemoModule } from './misc/rtl/rtldemo.module';
import { CampacksysTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { CampacksysValidationDemoModule } from './misc/validation/validationdemo.module';
import { CampacksysProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
  imports: [
    CampacksysMenuDemoModule,
    CampacksysContextMenuDemoModule,
    CampacksysPanelMenuDemoModule,
    CampacksysStepsDemoModule,
    CampacksysTieredMenuDemoModule,
    CampacksysBreadcrumbDemoModule,
    CampacksysMegaMenuDemoModule,
    CampacksysMenuBarDemoModule,
    CampacksysSlideMenuDemoModule,
    CampacksysTabMenuDemoModule,

    CampacksysBlockUIDemoModule,
    CampacksysCaptchaDemoModule,
    CampacksysDeferDemoModule,
    CampacksysInplaceDemoModule,
    CampacksysProgressBarDemoModule,
    CampacksysInputMaskDemoModule,
    CampacksysRTLDemoModule,
    CampacksysTerminalDemoModule,
    CampacksysValidationDemoModule,

    CampacksysButtonDemoModule,
    CampacksysSplitbuttonDemoModule,

    CampacksysInputTextDemoModule,
    CampacksysInputTextAreaDemoModule,
    CampacksysInputGroupDemoModule,
    CampacksysCalendarDemoModule,
    CampacksysChipsDemoModule,
    CampacksysInputMaskDemoModule,
    CampacksysInputSwitchDemoModule,
    CampacksysPasswordIndicatorDemoModule,
    CampacksysAutoCompleteDemoModule,
    CampacksysSliderDemoModule,
    CampacksysSpinnerDemoModule,
    CampacksysRatingDemoModule,
    CampacksysSelectDemoModule,
    CampacksysSelectButtonDemoModule,
    CampacksysListboxDemoModule,
    CampacksysRadioButtonDemoModule,
    CampacksysToggleButtonDemoModule,
    CampacksysEditorDemoModule,
    CampacksysColorPickerDemoModule,
    CampacksysCheckboxDemoModule,
    CampacksysKeyFilterDemoModule,

    CampacksysMessagesDemoModule,
    CampacksysToastDemoModule,
    CampacksysGalleriaDemoModule,

    CampacksysFileUploadDemoModule,

    CampacksysAccordionDemoModule,
    CampacksysPanelDemoModule,
    CampacksysTabViewDemoModule,
    CampacksysFieldsetDemoModule,
    CampacksysToolbarDemoModule,
    CampacksysScrollPanelDemoModule,
    CampacksysCardDemoModule,
    CampacksysFlexGridDemoModule,

    CampacksysBarchartDemoModule,
    CampacksysDoughnutchartDemoModule,
    CampacksysLinechartDemoModule,
    CampacksysPiechartDemoModule,
    CampacksysPolarareachartDemoModule,
    CampacksysRadarchartDemoModule,

    CampacksysDragDropDemoModule,

    CampacksysDialogDemoModule,
    CampacksysConfirmDialogDemoModule,
    CampacksysLightboxDemoModule,
    CampacksysTooltipDemoModule,
    CampacksysOverlayPanelDemoModule,
    CampacksysSideBarDemoModule,

    CampacksysTableDemoModule,
    CampacksysDataViewDemoModule,
    CampacksysVirtualScrollerDemoModule,
    CampacksysFullCalendarDemoModule,
    CampacksysOrderListDemoModule,
    CampacksysPickListDemoModule,
    CampacksysTreeDemoModule,
    CampacksysTreeTableDemoModule,
    CampacksysPaginatorDemoModule,
    CampacksysOrgChartDemoModule,
    CampacksysGmapDemoModule,
    CampacksysCarouselDemoModule,
    CampacksysProgressSpinnerDemoModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysprimengModule {}
