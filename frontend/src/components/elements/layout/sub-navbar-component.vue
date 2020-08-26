<template>
	<div>
		<DxNavBar 
			id="sub-navbar"
			selectionMode="single"
			:dataSource="menuItems"
			:onItemClick="navBarClick"
			:selectedIndex="0"
			:focusStateEnabled="false"
			:hoverStateEnabled="false"> 
		</DxNavBar>
	</div>
</template>

<script>
import { mapState } from "vuex";
import DxNavBar from "devextreme-vue/nav-bar";

//Routes
import { Main } from '@/routes/app-navigation';
import { Datacom } from '@/routes/app-navigation';
import { Partner } from '@/routes/app-navigation';
import { Merchant } from '@/routes/app-navigation';
import { SalesOffice } from '@/routes/app-navigation';
import { Warehouse } from '@/routes/app-navigation';
import { Employee } from '@/routes/app-navigation';
import { Customer } from '@/routes/app-navigation';
import { Inventory } from '@/routes/app-navigation';

export default {
	name: "subNavbarComponent",
	mixins: [],
	components: {
		DxNavBar
	},
	props: {
		
	},
	data() {
		return {
			navData: [
				{
					text: "Shipping",
				}, {
					text: "Payment Methods",
				}, {
					text: "Reporting",
				}
			]
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		navBarClick(e) {
			console.log('navBarClick e', e)
		}
	},
	computed: {
		...mapState([]),
		menuItems() {
      var menu = new Array();
      const route = this.$route.name
      if(route == "home") {
        menu = Main
      } else if(route == "datacom") {
        menu = Datacom;
      } else if(route == "partner") {
        menu = Partner;
      } else if(route == "merchant") {
        menu = Merchant;
      } else if(route == "sales-office") {
        menu = SalesOffice;
      } else if(route == "warehouse") {
        menu = Warehouse;
      } else if(route == "employee") {
        menu = Employee;
      } else if(route == "customer") {
        menu = Customer;
      } else if(route == "inventory") {
        menu = Inventory;
      }
      else {
        menu = Main;
      }

      return menu
    }
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
