import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Orders = {
  namespace: true,
	state: {
    enableCashDisocunt: true,
    dicountsList: [
      "5", "10", "15", "20", "25", "30", 
      "35", "40", "45", "50", "55", "60", 
      "65", "70", "80", "85", "90", "95", "100"
    ],
    transactions: [],
    orders: [
      {
        id: 1,
        title: "House Salad",
        items: "Salad, Ranch"
      },
      {
        id: 2,
        title: "Enchiladas",
        items: "Red Sauce, Extra Meat"
      },
      {
        id: 3,
        title: "Hamburger",
        items: "Well Done, No Bun"
      },
      {
        id: 4,
        title: "Chimichanga",
        items: "No Sauce"
      },
      {
        id: 5,
        title: "Tacos",
        items: "1 Chicken, 1 Beef"
      },
      {
        id: 6,
        title: "Gyro",
        items: "Gyro, Large Fries"
      },
      // {
      //   id: 7,
      //   title: "Tires",
      //   items: "Ties"
      // },
      // {
      //   id: 8,
      //   title: "Soap",
      //   items: "Cleanliness"
      // },
      // {
      //   id: 9,
      //   title: "Shoes",
      //   items: "Snaekers"
      // },
      // {
      //   id: 10,
      //   title: "Dinner",
      //   items: "Entree"
      // }
    ]
	},
	mutations: {
	
	},
	actions: {
  
	
		
		
  },
	getters: {
    getTransactions(state) {
      return state.transactions;
    }
		
  }
}
