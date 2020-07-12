<template>
	<div view="main">
			<f7-page>
		<div>
		<f7-row class="margin full-height-percent">
			<f7-card>
				<f7-card-header>
					<f7-block-title>Assets</f7-block-title>
				</f7-card-header>
				<f7-card-content>

						<DxTreeList
							height="300"
							id="chart-of-accounts"
							:data-source="accounts"
							:column-auto-width="true"
							:show-row-lines="true"
							:show-borders="true"
							:expanded-row-keys="expandedRowKeys"
							key-expr="ID"
							parent-id-expr="Head_ID"
							@cell-prepared="onCellPrepared"
							@editor-preparing="onEditorPreparing"
							@init-new-row="onInitNewRow"
						>
							<DxRowDragging
								:on-drag-change="onDragChange"
								:on-reorder="onReorder"
								:allow-drop-inside-item="allowDropInsideItem"
								:allow-reordering="allowReordering"
								:show-drag-icons="showDragIcons"
							/>
							<DxEditing
								data-view="current"
								:allow-updating="true"
								:allow-deleting="true"
								:allow-adding="true"
								mode="popup"
							/>
							<DxColumn
								data-field="account_number"
								display-expr="Account"
							>
								<DxValidationRule
									type="required"
								/>
							</DxColumn>
							<DxColumn
								data-field="Account_Name"
								caption="Name"
							>
								<DxValidationRule
									type="required"
								/>
							</DxColumn>
							<DxColumn
								:visible="false"
								data-field="Head_ID"
								caption="Head"
							>
								<DxLookup
									:data-source="lookupData"
									value-expr="ID"
									display-expr="Full_Name"
								/>
								<DxValidationRule
									type="required"
								/>
							</DxColumn>
							<DxColumn
								data-field="Account_Type"
							>
								<DxValidationRule
									type="required"
								/>
							</DxColumn>
							<DxColumn
								:width="150"
								data-field="Category"
							>
								<DxValidationRule
									type="required"
								/>
							</DxColumn>
							<DxColumn
								:width="120"
								data-field="Balance"
							>
								<DxValidationRule
									type="required"
								/>
							</DxColumn>


							<!-- <DxColumn
								data-field="account_number"
								caption="Account"
							/>
							<DxColumn data-field="Account_Name"/>
							<DxColumn data-field="Account_Type"/>
							<DxColumn data-field="Category"/>
							<DxColumn data-field="Balance"/>
							<DxColumn	data-field="Actions"/> -->
						</DxTreeList>
						<!-- <DxPopup ... >
							<DxPosition
									my="left"
									at="right"
									of="#target"
									
							/>
					</DxPopup> -->

				</f7-card-content>
			</f7-card>
		</f7-row>
	</div>
	</f7-page>
	</div>
</template>

<script>
import { mapState } from "vuex";

//components
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxButton } from 'devextreme-vue';

export default {
	name: "assetsComponent",
	mixins: [],
	components: {
		DxButton,
		DxScrollView,

	},
	props: {

	},
	data() {
		return {
			//ScrollSettings
			scrollSettings: {
				mode: "standard",
				showScrollbar: "always"
			},
			//Popup Options
			 popupOptions: {
        title: 'Employee Info',
        showTitle: true,
				width: "45%",
			},
			//Table Data
			allowDropInsideItem: false,
			allowReordering: true,
			showDragIcons: true,
			expandedRowKeys: [1],
			accounts: [
				{
					'ID': 1,
					'Head_ID': 0,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				}, {
					'ID': 2,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 3,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 4,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 5,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 6,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 7,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 8,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 9,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 10,
					'Head_ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
			],
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
      onDragChange(e) {
      let visibleRows = e.component.getVisibleRows(),
        sourceNode = e.component.getNodeByKey(e.itemData.ID),
        targetNode = visibleRows[e.toIndex].node;

      while (targetNode && targetNode.data) {
        if (targetNode.data.ID === sourceNode.data.ID) {
          e.cancel = true;
          break;
        }
        targetNode = targetNode.parent;
      }
    },
    onReorder(e) {
      let visibleRows = e.component.getVisibleRows(),
        sourceData = e.itemData,
        targetData = visibleRows[e.toIndex].data;

      if (e.dropInsideItem) {
        e.itemData.Head_ID = targetData.ID;
        e.component.refresh();
      } else {
        let sourceIndex = this.accounts.indexOf(sourceData),
          targetIndex = this.accounts.indexOf(targetData);

        if (sourceData.Head_ID !== targetData.Head_ID) {
          sourceData.Head_ID = targetData.Head_ID;
          if (e.toIndex > e.fromIndex) {
            targetIndex++;
          }
        }

        this.accounts.splice(sourceIndex, 1);
        this.accounts.splice(targetIndex, 0, sourceData);
      }
		},
		 onCellPrepared(e) {
      if(e.column.command === 'edit') {
        let addLink = e.cellElement.querySelector('.dx-link-add');

        if(addLink) {
          addLink.remove();
        }
      }
    },
    onEditorPreparing(e) {
      if(e.dataField === 'Head_ID' && e.row.data.ID === 1) {
        e.editorOptions.disabled = true;
        e.editorOptions.value = null;
      }
    },
    onInitNewRow(e) {
      e.data.Head_ID = 1;
    }
  
	},
	computed: {
		...mapState([]),
		//Lookup Data
		lookupData() {
			return {
				store: this.accounts,
				sort: 'account_number'
			}
			}
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">
#chart-of-accounts {
		z-index: 1500;
    max-height: 440px;
}

.dx-sortable-dragging {
    opacity: 0.9
}

.options {
    margin-top: 20px;
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    position: relative;
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option {
   margin-top: 10px;
   margin-right: 40px;
   display: inline-block;
}

.option:last-child {
    margin-right: 0;
}

</style>
