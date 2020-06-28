<template>
	<div>
		<!-- Categories Popup -->
		<f7-popup class="category-popup" :opened="categorySettings.catPopupOpened" @popup:closed="categorySettings.catPopupOpened = false">
			<f7-page>
				<f7-navbar title="Inventory Categories">
					<f7-nav-right>
						<f7-link popup-close>Close</f7-link>
					</f7-nav-right>
				</f7-navbar>
				<f7-block>
					<f7-row>
						<f7-col width="50">
							<f7-list>
								<p>New Category:</p>
								<f7-list-input :value="categoryData.name" @input="categoryData.name = $event.target.value" type="text">
								</f7-list-input>
							</f7-list>
							<f7-button class="margin" @click="addCategory">Add Category</f7-button>
						</f7-col>
						<f7-col width="50">
							<p class="field-title">Saved Categories</p>
							<div
								class="full-width display-flex justify-content-space-around"
								v-for="(category, index) in GET_INV_CATEGORY_LIST"
								:key="index"
							>
								<div class="margin-half full-width">{{ category.name }}</div>
								<div class="delete" @click="deleteCategory(category.name)"></div>
							</div>
						</f7-col>
					</f7-row>
				</f7-block>
			</f7-page>
		</f7-popup>
		<!-- END Categories Popup -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components


export default {
	name: "inventoryCategoriesPopupComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
		categoryData: {
			type: Object,
			required: true
		},
		categorySettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Component Data

			//Main Data

		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},
		addCategory() {
			console.log("adding new category");
			var categoryObj = this.categoryData;
			delete categoryObj.id;
			this.$store.dispatch("POSTCategories", categoryObj);
		},
		deleteCategory(name) {
			//I need to do a search for inventory items that already have a category attached to them that are being deleted
			//Ask the user if they want to delete the categories from the items first. Otherwise prevent deletion.
			var categoryObj = this.GET_INV_CATEGORY_LIST.find((elem) => elem.name === name);
			console.log("categoryObj", categoryObj);
			this.$store.dispatch("DELETEInventoryCategory", categoryObj.id);
		},


	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters(["GET_INV_CATEGORY_LIST"])

	},
	created() {

	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="less">

</style>
