<template>
	<div class="page-container">
		
		<div class="md-title p-1 bg-datacom-lighter text-white w-full">Users</div>
		<md-list>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-account-tie mdi-48px pr-2"></i>
				<span class="md-list-item-text">Super User</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
			<i class="mdi mdi-office-building mdi-48px pr-2"></i>
				<span class="md-list-item-text">Partners</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-office-building mdi-48px pr-2"></i>
				<span class="md-list-item-text">Merchants</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-office-building mdi-48px pr-2"></i>
				<span class="md-list-item-text">Vendors</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-account-group mdi-48px pr-2"></i>
				<span class="md-list-item-text">Employees</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-account-group mdi-48px pr-2"></i>
				<span class="md-list-item-text">Customers</span>
			</md-list-item>

			<div class="md-title p-1 bg-datacom-lighter text-white w-full">Finance</div>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-package-variant mdi-48px pr-2"></i>
				<span class="md-list-item-text">Accounting</span>
			</md-list-item>

			<div class="md-title p-1 bg-datacom-lighter text-white w-full">Locations</div>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="material-icons pr-2" style="font-size:50px;">store</i>
				<span class="md-list-item-text">Sales Offices</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-warehouse mdi-48px pr-2"></i>
				<span class="md-list-item-text">Warehouses</span>
			</md-list-item>

			<div class="md-title p-1 bg-datacom-lighter text-white w-full">Point of Sale</div>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-package-variant mdi-48px pr-2"></i>
				<span class="md-list-item-text">Inventory</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-cash-register mdi-48px pr-2"></i>
				<span class="md-list-item-text">Retail POS</span>
			</md-list-item>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-cash-register mdi-48px pr-2"></i>
				<span class="md-list-item-text">Virtual Terminal</span>
			</md-list-item>

			<div class="md-title p-1 bg-datacom-lighter text-white w-full">Applications</div>
			<md-list-item to="/colors" @click="closeDrawer">
				<i class="mdi mdi-timer mdi-48px pr-2"></i>
				<span class="md-list-item-text">Attendance</span>
			</md-list-item>



		</md-list>
	</div>
</template>

<script>
import { mapState } from "vuex";
import {bus} from '@/services/event-bus'

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
.md-list-item {
	border-bottom: 1px solid  rgba(192,192,192,0.5);
	&.md-list-item:hover {
		background: rgba(192,192,192,0.5);
	}
}

</style>
