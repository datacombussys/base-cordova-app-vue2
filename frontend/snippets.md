********************************************  Devexpress ************************************************

********************  Simple Form *************************
import { DxTextBox, DxTextArea} from 'devextreme-vue';
<div class="form">
	<div class="dx-fieldset">
		<div class="dx-fieldset-header">Simple Field Set</div>
		<div class="dx-field">
			<div class="dx-field-label">Full Name</div>
			<div class="dx-field-value-static">Kevin Carter</div>
		</div>
		<div class="dx-field">
			<div class="dx-field-label">Position</div>
		<div class="dx-field-value-static">Shipping Manager</div>
		</div>
	</div>
	<div class="dx-fieldset">
		<div class="dx-fieldset-header">Field Set with DevExtreme Widgets</div>
		<div class="dx-field">
			<div class="dx-field-label">Address</div>
			<DxTextBox class="dx-field-value" value="424 N Main St."/>
		</div>
		<div class="dx-field">
			<div class="dx-field-label">City</div>
			<DxTextBox class="dx-field-value" value="San Diego"/>
		</div>
	</div>
	<div class="dx-fieldset" id="notes-container">
		<div class="dx-fieldset-header">Field Set with Custom Value Width</div>
		<div class="dx-field">
			<div class="dx-field-label">Notes</div>
			<DxTextArea class="dx-field-value" :height="80" value="Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months. When not in the office, he is usually on the basketball court playing pick-up games."/>
		</div>
	</div>
</div>

********************  Auto Render Form *************************
import { DxForm, DxGroupItem, DxSimpleItem } from 'devextreme-vue/form';
<template>
	<div class="widget-container">
		<DxForm
			id="form"
			:form-data="formData"
			:read-only="readOnly"
			:show-colon-after-label="showColon"
			:label-location="labelLocation"
			:min-col-width="minColWidth"
			:col-count="colCount"
			:width="width"
		/>
	</div>
</template>

********************  Auto Render Form / Groups *************************
https://js.devexpress.com/Documentation/Guide/Widgets/Form/Organize_Simple_Items/In_Groups/
import { DxForm, DxGroupItem, DxSimpleItem, DxLabel } from 'devextreme-vue/form';
import DxTextArea from 'devextreme-vue/text-area';
import DxCalendar from 'devextreme-vue/calendar';

<template>
	<DxForm :form-data="employee">
		<DxGroupItem caption="Personal Data">
			<DxSimpleItem data-field="firstName" />
			<DxSimpleItem data-field="lastName" />
			<DxSimpleItem 
				data-field="birth_date"
				editor-type="dxCalendar"
				:editor-options="calendarOptions" />
		</DxGroupItem>
		<DxGroupItem caption="Contacts">
			<DxSimpleItem data-field="phone">
				<DxLabel text="Show the Phone Number" />
			</DXSimpleItem>
			<DxSimpleItem 
				data-field="description" 
				editor-type="dxTextArea"
				:editor-options="{ height: 90 }" />
		</DxGroupItem>
	</DxForm>
</template>
<script>
	data: () {
		return {
			const employee = {
			firstName: 'John',
			lastName: 'Heart',
			position: 'CEO',
			phone: '+1(213) 555-9392',
			email: 'jheart@dx-email.com'
			},
			calendarOptions: { value: new Date() },
			textAreaOptions: { placeholder: 'Add notes...' }
		}
	}
</script>

******************** Text Box *************************

TextBox modes:
Accepted Values: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'


******************** Accessing Methods on Widgets *************************
Add to widget
@initialized="saveProfileFormInstance"
Create Method to save instance
saveProfileFormInstance(e) {
	this.profileFormInstance = e.component
}
Access the methods by:  this.profileFormInstance.focus()

     ----- or ------

ref="profileForm"
let profileRef = this.$refs['profileForm'].instance
profileRef.focus()

********************  Validation Rules *************************
<DxRequiredRule message="Email is required"/>
<DxEmailRule message="Email is invalid"/>
<DxAsyncRule
	:validation-callback="asyncValidation"
	message="Email is already registered"
/>
<DxCompareRule
	:comparison-target="passwordComparison"
	message="Password and Confirm Password do not match"
/>
<DxPatternRule
	:pattern="namePattern"
	message="Do not use digits in the Name"
/>


********************  Datebox *************************
https://js.devexpress.com/Demos/WidgetsGallery/Demo/DateBox/Formatting/Vue/Light/
Format
<DxDateBox
	:show-clear-button="true"
	:use-mask-behavior="true"
	:value="date"
	placeholder="Tuesday, 16 of Oct, 2018 14:52"
	display-format="EEEE, d of MMM, yyyy HH:mm"
	type="datetime"
/>
types
date - the widget displays only the date;
time - the widget displays only the time;
datetime - the widget displays both the date and time.

let newDate = e.value
let ISODate = newDate.toISOString()
let djangoTime = ISODate.split('T')[0]
this.formData.sale_expires = djangoTime

********************  Files  *************************
<form
	id="form"
	ref="invFormFilesRef"
	method="post"
	action=""
	enctype="multipart/form-data"
> </form>
const form = this.$refs.invFormFilesRef[0].files;
console.log('form', form);

********************  Datagrid Options  *************************
Column types:
Accepted Values: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime'
Date-time values stored as strings should have one of the following formats: "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy-MM-ddTHH:mm:ssx" or "yyyy-MM-ddTHH:mm:ss".

Format Cells
Accepted Values: 'billions' | 'currency' | 'day' | 'decimal' | 'exponential' | 'fixedPoint' | 'largeNumber' | 'longDate' | 'longTime' | 'millions' | 'millisecond' | 'month' | 'monthAndDay' | 'monthAndYear' | 'percent' | 'quarter' | 'quarterAndYear' | 'shortDate' | 'shortTime' | 'thousands' | 'trillions' | 'year' | 'dayOfWeek' | 'hour' | 'longDateLongTime' | 'minute' | 'second' | 'shortDateShortTime'


********************  proper Rows and Cols  *************************
<div class="container">
	<div class="row">
		<div class="title">Title Here</div>
		<div class="col-50p">			
		</div>
		<div class="col-50p">
		</div>
	</div>
	<div class="row">
		<div class="title">Title Here</div>
		<div class="col-50p">			
		</div>
		<div class="col-50p">
		</div>
	</div>
</div>

******************** DxValidator Groups with separate button  ************************* 
<template>
    <DxTextBox>
        <DxValidator
            :validation-group="validationGroupName">
            <DxAsyncRule
                :validation-callback="validateAsync"
            />
        </DxValidator>
    </DxTextBox>
 
    <DxDateBox>
        <DxValidator
            :validation-group="validationGroupName">
            <DxAsyncRule
                :validation-callback="validateAsync"
            />
        </DxValidator>
    </DxDateBox>
 
    <DxButton
        :validation-group="validationGroupName"
        @click="validateGroup()"
    />
</template>

******************** DropDown with List of Objects  ************************* 
<DxDropDownBox
	:data-source="GET_DATACOM_LIST"
	:value.sync="selectedDatacom"
	placeholder="Select a value..."
	display-expr="dba_name"
	@value-changed="dxDropdownSelection($event)"
>
	<DxList
		:data-source="GET_DATACOM_LIST"
		:height="400"
		:selected-items.sync="selectedDatacom"
		selection-mode="single"
		display-expr="dba_name"> 
		//Or use template below
		<!-- <template #item="{ data: item }">
			{{ item.dba_name }}
		</template> -->
	</DxList>
</DxDropDownBox>
methods: {
	dxDropdownSelection(e) {
		e.component.close()
	}
}

******************** Field with Label  ************************* 
<div class="field">
	<div class="label">
		Label Text here
	</div>  
	<div class="content">
		<p>input field here</p>
	</div>
</div>


******************** Event Bus  ************************* 
import {EventBus} from '@/services/event-bus';
EventBus.$on('EVENT_NAME', val => {
	//execute stuff here;
	});
}










