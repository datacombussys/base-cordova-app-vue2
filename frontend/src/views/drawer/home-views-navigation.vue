<template>
	<div class="page-container">
		<v-list>
		<div class="title p-1 bg-datacom-lighter text-white w-full">Users</div>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-account-tie mdi-48px pr-2"></i>
				<span class="v-list-item-text">Super User</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
			<i class="mdi mdi-office-building mdi-48px pr-2"></i>
				<span class="v-list-item-text">Partners</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-office-building mdi-48px pr-2"></i>
				<span class="v-list-item-text">Merchants</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-office-building mdi-48px pr-2"></i>
				<span class="v-list-item-text">Vendors</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-account-group mdi-48px pr-2"></i>
				<span class="v-list-item-text">Employees</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-account-group mdi-48px pr-2"></i>
				<span class="v-list-item-text">Customers</span>
			</v-list-item>

			<div class="title p-1 bg-datacom-lighter text-white w-full">Finance</div>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-package-variant mdi-48px pr-2"></i>
				<span class="v-list-item-text">Accounting</span>
			</v-list-item>

			<div class="title p-1 bg-datacom-lighter text-white w-full">Locations</div>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="material-icons pr-2" style="font-size:50px;">store</i>
				<span class="v-list-item-text">Sales Offices</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-warehouse mdi-48px pr-2"></i>
				<span class="v-list-item-text">Warehouses</span>
			</v-list-item>

			<div class="title p-1 bg-datacom-lighter text-white w-full">Point of Sale</div>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-package-variant mdi-48px pr-2"></i>
				<span class="v-list-item-text">Inventory</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-cash-register mdi-48px pr-2"></i>
				<span class="v-list-item-text">Retail POS</span>
			</v-list-item>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-cash-register mdi-48px pr-2"></i>
				<span class="v-list-item-text">Virtual Terminal</span>
			</v-list-item>

			<div class="title p-1 bg-datacom-lighter text-white w-full">Applications</div>
			<v-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-timer mdi-48px pr-2"></i>
				<span class="v-list-item-text">Attendance</span>
			</v-list-item>
		</v-list>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { bus } from '@/services/event-bus'

export default {
	name: "homeViewNavigation",
	mixins: [],
	components: {},
	props: {
		menuVisible: {
			type: Boolean,
			required: true
		}
  },
	data() {
		return {
			isOpen: false,
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		closeDrawer() {
			console.log("closeDrawer")
			bus.$emit('closeDrawer', this.isOpen);
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
.v-list-item {
	border-bottom: 1px solid  rgba(192,192,192,0.5);
	&.v-list-item:hover {
		background: rgba(192,192,192,0.5);
	}
}

</style>
