<template>
	<div>
		<f7-row class="margin">
			<f7-card>
				<f7-card-header>
					<f7-block-title>Equity</f7-block-title>
				</f7-card-header>
				<f7-card-content>
					<DxTreeList
							height="300"
							@initialized="saveDataTreeInstance"
							id="chart-of-accounts"
							:data-source="accounts"
							:root-value="-1"
							:show-row-lines="true"
							:show-borders="true"
							:expanded-row-keys="expandedRowKeys"
							:column-auto-width="true"
							key-expr="ID"
							parent-id-expr="Head_ID"
							:scrolling="scrollSettings"
						>
							<DxRowDragging
								:on-drag-change="onDragChange"
								:on-reorder="onReorder"
								:allow-drop-inside-item="allowDropInsideItem"
								:allow-reordering="allowReordering"
								:show-drag-icons="showDragIcons"
							/>
							<DxColumn
								data-field="account_number"
								caption="Account"
							/>
							<DxColumn data-field="Account_Name"/>
							<DxColumn data-field="Account_Type"/>
							<DxColumn data-field="Category"/>
							<DxColumn data-field="Balance"/>
							<DxColumn	data-field="Actions"/>
						</DxTreeList>
				</f7-card-content>
			</f7-card>
		</f7-row>
	</div>
</template>

<script>
import { mapState } from "vuex";

//components
import { DxTreeList, DxColumn, DxRowDragging } from 'devextreme-vue/tree-list';
import { DxScrollView } from 'devextreme-vue/scroll-view';

export default {
	name: "equityComponent",
	mixins: [],
	components: {
		DxTreeList,
    DxColumn,
		DxRowDragging,
		DxScrollView
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
			//Table Data
			allowDropInsideItem: false,
			allowReordering: true,
			showDragIcons: true,
			expandedRowKeys: [1],
			accounts: [
				{
					'ID': 1,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				}, {
					'ID': 2,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 3,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 4,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 5,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 6,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 7,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 8,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 9,
					'Account_Name': 'Current Assets - Summary Account',
					'account_number': '100001',
					'Account_Type': 'Current Assets',
					'Category': 'Cash Account',
					'Balance': '$12,525.35',
					'Actions': 'Edit',
				},
				{
					'ID': 10,
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
		 saveDataTreeInstance(e) {
        this.dataTreeInstance = e.component;
        console.log('saveDataTreeInstance e', e);
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
    }
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">
#chart-of-accounts {
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
