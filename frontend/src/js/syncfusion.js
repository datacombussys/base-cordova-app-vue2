// Import Vue
import Vue from 'vue';

// import { Draggable, Animation  } from '@syncfusion/ej2-base';
import { AccordionPlugin } from '@syncfusion/ej2-vue-navigations';
import { AccumulationChartPlugin } from '@syncfusion/ej2-vue-charts';
import { AutoCompletePlugin } from '@syncfusion/ej2-vue-dropdowns';
import { BarcodeGeneratorPlugin } from '@syncfusion/ej2-vue-barcode-generator';
import { BulletChartPlugin } from '@syncfusion/ej2-vue-charts';
import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons';
Vue.use(ButtonPlugin);
import { CalendarPlugin } from '@syncfusion/ej2-vue-calendars';
import { ChartPlugin } from '@syncfusion/ej2-vue-charts';
import { CheckBoxPlugin } from "@syncfusion/ej2-vue-buttons";
import { ChipListPlugin } from '@syncfusion/ej2-vue-buttons';
import { CircularGaugePlugin } from '@syncfusion/ej2-vue-circulargauge';
import { ColorPickerPlugin } from '@syncfusion/ej2-vue-inputs';
import { ComboBoxPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { ContextMenuPlugin } from "@syncfusion/ej2-vue-navigations";
import { DashboardLayoutPlugin } from '@syncfusion/ej2-vue-layouts';
Vue.use(DashboardLayoutPlugin);
import { DatePickerPlugin } from '@syncfusion/ej2-vue-calendars';
import { DateRangePickerPlugin } from '@syncfusion/ej2-vue-calendars';
import { DateTimePickerPlugin } from '@syncfusion/ej2-vue-calendars';
import { DiagramPlugin } from '@syncfusion/ej2-vue-diagrams';
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { DocumentEditorPlugin } from '@syncfusion/ej2-vue-documenteditor';
import { DropDownButtonPlugin } from "@syncfusion/ej2-vue-splitbuttons";
import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { DropDownTreePlugin } from '@syncfusion/ej2-vue-dropdowns';
import { FileManagerPlugin } from "@syncfusion/ej2-vue-filemanager";
import { GanttPlugin } from '@syncfusion/ej2-vue-gantt';
import { GridPlugin } from '@syncfusion/ej2-vue-grids';
import { HeatMapPlugin } from '@syncfusion/ej2-vue-heatmap';
import { InPlaceEditorPlugin } from '@syncfusion/ej2-vue-inplace-editor';
import { KanbanPlugin } from '@syncfusion/ej2-vue-kanban';
import { LinearGaugePlugin } from '@syncfusion/ej2-vue-lineargauge';
import { ListBoxPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { ListViewPlugin } from '@syncfusion/ej2-vue-lists';
import { MapsPlugin } from '@syncfusion/ej2-vue-maps';
import { MaskedTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { MenuPlugin } from "@syncfusion/ej2-vue-navigations";
import { MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { PagerPlugin } from '@syncfusion/ej2-vue-grids';
import { PdfViewerPlugin } from '@syncfusion/ej2-vue-pdfviewer';
import { PivotViewPlugin } from '@syncfusion/ej2-vue-pivotview';
import { ProgressBarPlugin } from '@syncfusion/ej2-vue-progressbar';
import { ProgressButtonPlugin } from "@syncfusion/ej2-vue-splitbuttons";
import { QueryBuilderPlugin } from '@syncfusion/ej2-vue-querybuilder';
import { RadioButtonPlugin } from "@syncfusion/ej2-vue-buttons";
import { RangeNavigatorPlugin } from '@syncfusion/ej2-vue-charts';
import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor';
import { SchedulePlugin } from '@syncfusion/ej2-vue-schedule';
import { SidebarComponent, SidebarPlugin } from '@syncfusion/ej2-vue-navigations';
import { SliderPlugin } from "@syncfusion/ej2-vue-inputs";
import { SparklinePlugin } from '@syncfusion/ej2-vue-charts';
import { SplitButtonPlugin } from "@syncfusion/ej2-vue-splitbuttons";
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';
import { SpreadsheetPlugin } from '@syncfusion/ej2-vue-spreadsheet';
import { SwitchPlugin } from "@syncfusion/ej2-vue-buttons";
import { TabPlugin } from '@syncfusion/ej2-vue-navigations';
import { TimePickerPlugin } from '@syncfusion/ej2-vue-calendars';
import { ToastPlugin } from '@syncfusion/ej2-vue-notifications';
import { ToolbarPlugin } from '@syncfusion/ej2-vue-navigations';
import { TooltipPlugin } from "@syncfusion/ej2-vue-popups";
import { TreeGridPlugin } from '@syncfusion/ej2-vue-treegrid';
import { TreeMapPlugin } from '@syncfusion/ej2-vue-treemap';
import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations";
import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs';


// 	AccordionPlugin,
// 	AccumulationChartPlugin,
// 	AutoCompletePlugin,
// 	BarcodeGeneratorPlugin,
// 	BulletChartPlugin,
	
// 	CalendarPlugin,
// 	ChartPlugin,
// 	CheckBoxPlugin,
// 	ChipListPlugin,
// 	CircularGaugePlugin,
// 	ColorPickerPlugin,
// 	ComboBoxPlugin,
// 	ContextMenuPlugin,
	
// 	DatePickerPlugin,
// 	DateRangePickerPlugin,
// 	DateTimePickerPlugin,
// 	DiagramPlugin,
// 	DialogPlugin,
// 	DocumentEditorPlugin,
// 	DropDownButtonPlugin,
// 	DropDownListPlugin,
// 	DropDownTreePlugin,
// 	FileManagerPlugin,
// 	GanttPlugin,
// 	GridPlugin,
// 	HeatMapPlugin,
// 	InPlaceEditorPlugin,
// 	KanbanPlugin,
// 	LinearGaugePlugin,
// 	ListBoxPlugin,
// 	ListViewPlugin,
// 	MapsPlugin,
// 	MaskedTextBoxPlugin,
// 	MenuPlugin,
// 	MultiSelectPlugin,
// 	NumericTextBoxPlugin,
// 	PagerPlugin,
// 	PdfViewerPlugin,
// 	PivotViewPlugin,
// 	ProgressBarPlugin,
// 	ProgressButtonPlugin,
// 	QueryBuilderPlugin,
// 	RadioButtonPlugin,
// 	RangeNavigatorPlugin,
// 	RichTextEditorPlugin,
// 	SchedulePlugin,
// 	SidebarComponent,
// 	SliderPlugin,
// 	SparklinePlugin,
// 	SplitButtonPlugin,
// 	SplitterComponent,
// 	SpreadsheetPlugin,
// 	SwitchPlugin,
// 	TabPlugin,
// 	TimePickerPlugin,
// 	ToastPlugin,
// 	ToolbarPlugin,
// 	TooltipPlugin,
// 	TreeGridPlugin,
// 	TreeMapPlugin,
// 	TreeViewPlugin,
// 	UploaderPlugin




