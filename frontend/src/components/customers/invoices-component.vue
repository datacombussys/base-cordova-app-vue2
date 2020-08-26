<template>
	<div>
		<div class="headline">Invoices</div>
		<template>
			<v-data-table
				:headers="headers"
				:items="desserts"
				:items-per-page="5"
				class="elevation-1"
  ></v-data-table>
		</template>
		<!-- <div class="row">
			<DxButton
				:width="150"
				class="ml-4"
				text="Test"
				type="danger"
				styling-mode="contained"
				:focusStateEnabled="false"
				@click="testingMethod">
			</DxButton>
		</div> -->
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
	DxSearchPanel,
	DxEditing,
	DxSelection
	} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import { confirm, custom, alert } from 'devextreme/ui/dialog';

export default {
	name: "invoiceDatabaseComponent",
	mixins: [],
	components: {
		DxDataGrid,
		DxColumn,
		DxGrouping,
		DxGroupPanel,
		DxPager,
		DxPaging,
		DxSearchPanel,
		DxEditing,
		DxSelection,
		DxButton,
		alert
	},
	props: {
		databaseSettings: {
			type: Object,
			required: true
		},
		databaseData: {
			type: Object, 
			required: true
		}
	},
	data() {
		return {
			//DataTable
			headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],


		};
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
			console.log('this.table', this.table);
			console.log('this.event', this.event);
		},

	},
	computed: {
		...mapGetters([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
