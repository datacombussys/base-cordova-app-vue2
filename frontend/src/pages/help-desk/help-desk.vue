<template>
  <div>
		<div class="row">
			<div class="col-25p">

			</div>
			<div class="col-25p">

			</div>
			<div class="col-25p">
				<DxButton
					:width="120"
					text="New Ticket"
					type="default"
					styling-mode="contained"
					@click="isPopupVisible = true"
				/>
			</div>
		</div>
    <div class="headline2">Help Desk</div>
    <h3>Submit New Form</h3>
		<h3>Show tickets with status - One table to filter</h3>
		<h4>Allow for notes to be made by user</h4>
		<h5>Alow for uploading files</h5>

		<template>
			<DxPopup
				title="New Ticket"
				:visible.sync="isPopupVisible">
				<template>
					<form
						id="form"
						ref="newTicketForm"
						method="post"
						action=""
						enctype="multipart/form-data"
					>
						<div class="dx-fieldset mt-0">
							<div class="row">
								<div class="col-50p">
									<div class="dx-field">
										<div class="dx-field-label">User Name</div>
										<div class="dx-field-value">
											<DxTextBox >
												<DxValidator>
													<DxPatternRule
														pattern="^[a-zA-Z0-9 ]+$"
														message="The name should not contain special characters"
													/>
													<DxRequiredRule message="DBA name is required"/>
												</DxValidator>
											</DxTextBox>
										</div>
									</div>
								</div>
								<div class="col-50p">
									<div class="dx-field">
										<div class="dx-field-label">Category</div>
										<div id="category-drop-down-menu" class="dx-field-value">
											<DxDropDownBox
												:data-source="categories"
												:opened.sync="isDropDownOpened">
												<DxList
													:data-source="categories"
													selection-mode="single"
													@selection-changed="changeCategoryValue($event)">
												</DxList>
										</DxDropDownBox>
										</div>
									</div>
								</div>
								<div class="col-50p">
									<div class="dx-field">
										<div class="dx-field-label">Subject</div>
										<div class="dx-field-value">
											<DxTextBox 
												placeholder="shortname"
												:value.sync="helpDeskForm.subject">
												<DxValidator>
													<DxRequiredRule message="Subject is required"/>
												</DxValidator>
											</DxTextBox>
										</div>
									</div>
								</div>
								<div class="w-full mx-5">
									<div class="dx-field">
										<div class="dx-field-label">Description</div>
										<div class="dx-field-value">
											<DxTextBox 
												:value.sync="helpDeskForm.description">
												<DxValidator>
													<DxRequiredRule message="Website is required"/>
												</DxValidator>
											</DxTextBox>
										</div>
									</div>
								</div>

								<div class="col-50p">
									<div class="dx-field">
										<div class="dx-field-label">File</div>
										<div class="dx-field-value">
											<div class="fileuploader-container">
												<DxFileUploader
													select-button-text="Select file"
													label-text=""
													accept="image/*"
													upload-mode="useForm"
												/>
											</div>
										</div>
									</div>
								</div>
								<div class="col-50p">
									<div class="dx-field">
										<div class="dx-field-label">Priority</div>
										<div id="priority-drop-down-menu" class="dx-field-value">
											<DxDropDownBox
												:data-source="priorities"
												:opened.sync="isDropDownOpened">
												<DxList
													:data-source="priorities"
													selection-mode="single"
													@selection-changed="changePriorityValue($event)">
												</DxList>
											</DxDropDownBox>
										</div>
									</div>
								</div>
								<div class="col-50p">
									<div class="dx-field">
										<div class="dx-field-label">Expedite</div>
										<div class="dx-field-value flex justify-start">
											<DxSwitch 
												@changed="helpDeskForm.is_expedited = !helpDeskForm.is_expedited"
												:value="helpDeskForm.is_expedited" />
										</div>
									</div>
								</div>

								<!-- Buttons -->
								<template>	
									<div class="row justify-between mt4">
										<div class="col-25p text-center">
											<v-btn class=" text-white bg-danger">Delete</v-btn>
										</div>
										<div class="col-25p text-center">
											<v-btn @click="testingMethod" class=" text-white bg-success">Save</v-btn>
										</div>
									</div>
								</template>

							</div>
						</div>
					</form>
				</template>
			</DxPopup>
		</template>

		<!-- DataGrid -->
		<template>
			<DxDataGrid
				:data-source="dataSource"
				:remote-operations="false"
				:allow-column-reordering="true"
				:row-alternation-enabled="true"
				:show-borders="true"
				@content-ready="onContentReady"
			>
				<DxColumn
					:group-index="0"
					data-field="Product"
				/>
				<DxColumn
					data-field="Amount"
					caption="Sale Amount"
					data-type="number"
					format="currency"
					alignment="right"
				/>
				<DxColumn
					:allow-grouping="false"
					data-field="Discount"
					caption="Discount %"
					data-type="number"
					format="percent"
					alignment="right"
					cell-template="discountCellTemplate"
					css-class="bullet"
				/>
				<DxColumn
					data-field="SaleDate"
					data-type="date"
				/>
				<DxColumn
					data-field="Region"
					data-type="string"
				/>
				<DxColumn
					data-field="Sector"
					data-type="string"
				/>
				<DxColumn
					data-field="Channel"
					data-type="string"
				/>
				<DxColumn
					:width="150"
					data-field="Customer"
					data-type="string"
				/>

				<DxGroupPanel :visible="true"/>
				<DxSearchPanel
					:visible="true"
					:highlight-case-sensitive="true"
				/>
				<DxGrouping :auto-expand-all="false"/>
				<DxPager
					:allowed-page-sizes="pageSizes"
					:show-page-size-selector="true"
				/>
				<DxPaging :page-size="10"/>
				<template #discountCellTemplate="{ data: cellData }">

				</template>
			</DxDataGrid>
		</template>

  </div>
</template>

<script>
import DxButton from 'devextreme-vue/button';
import { DxPopup } from 'devextreme-vue/popup';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxList from 'devextreme-vue/list';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import notify from 'devextreme/ui/notify';
import DxSwitch from 'devextreme-vue/switch';
import { DxTextBox } from 'devextreme-vue/text-box';

import DxValidationSummary from 'devextreme-vue/validation-summary';
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
  DxAsyncRule
} from 'devextreme-vue/validator';

import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel
} from 'devextreme-vue/data-grid';
import DataSource from 'devextreme/data/data_source';

let collapsed = false;

export default {
  name: "helpDesk",
    mixins: [

  ],
  components: {
		DxButton,
		DxPopup,
		DxDropDownBox,
		DxList,
		DxFileUploader,
		notify,
		DxSwitch,
		DxTextBox,
		DxValidationSummary,
		DxValidator,
		DxRequiredRule,
		DxCompareRule,
		DxEmailRule,
		DxPatternRule,
		DxStringLengthRule,
		DxRangeRule,
		DxAsyncRule,
		DxDataGrid,
		DxColumn,
		DxGrouping,
		DxGroupPanel,
		DxPager,
		DxPaging,
		DxSearchPanel,
		DataSource

  },
  data() {
    return {
      //Component Data
      moduleInfo: {
        name: "Help Desk",
        type: "dashboard",
        level: 5
      },
			//Main Settings
			
			//Popup
			isPopupVisible: false,
			isDropDownOpened: false,

			//Form
			helpDeskForm: {
				datacom: null,
				partner: null,
				merchant: null,
				employee: null,
				customer: null,
				category: null,
				subject: null,
				description: null,
				file: null,
				priority_request: null,
				priority: null,
				is_expedited: false,

			},
			//Data
			categories: [
				"Pricing",
				"Outage",
				"Finance",
				"Custoemr Service",
				"Development",
				"Inquiry"
			],
			priorities: [
				"Extreme",
				"High",
				"Rush",
				"Normal",
				"Take your time",
			],
			//DataGrid DataSource
			dataSource: new DataSource({
        store: {
          type: 'odata',
          url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
          beforeSend: function(request) {
            request.params.startDate = '2018-05-10';
            request.params.endDate = '2018-05-15';
          }
        }
      }),
      pageSizes: [10, 25, 50, 100],
      onContentReady: function(e) {
        if (!collapsed) {
          e.component.expandRow(['EnviroCare']);
          collapsed = true;
        }
      }

    
    }
  },
  methods: {
    testingMethod() {
      
		},
		changePriorityValue() {
			console.log('changeDropDownBoxValue e', e)
			this.helpDeskForm.category = e.addedItems[0];
			this.isDropDownOpened = false;
		},
		changeCategoryValue() {
			console.log('changeDropDownBoxValue e', e)
			this.helpDeskForm.category = e.addedItems[0];
			this.isDropDownOpened = false;
		},
		onButtonClick() {
      notify('Uncomment the line to enable sending a form to the server.');
			const form = this.$refs[this.newTicketForm];
			console.log('form',form)
    }

  },
  computed: {

    
  },
  watch: {

  },
  mounted() {

    
  },
  created() {

  },

    
  }
</script>

<style lang="scss" scoped>
#form {
		max-width: 1200px;
		
    margin: auto;
}


.button {
    margin-top: 50px;
    margin-right: 20px;
    float: right;
}

.fileuploader-container{
    border: 1px solid #d3d3d3;
    margin: 20px 20px 0 20px;
}

#form h3 {
    margin-left: 20px;
		font-weight: normal;
}
   
</style>

