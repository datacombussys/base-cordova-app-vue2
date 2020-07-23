;
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


export const DragNDrop = {
	namespace: true,
	state: {
		rows: [
			{
				name: "Row 1",

			},
		],
		columns: [
			{
				name: "Column One",
				description: "",
				id: 1,

			},
		]

	},
	mutations: {
		CREATE_ROW(state, payload) {
			// var row = state.rows.find(elem => elem.id = to_row_id);
			state.rows.push({id: 1, name: "New Name"});
		},
		CREATE_COL(state, payload) {
			state.columns.push({id: to_row_id, name: "New Col Name"});
		},
		MOVE_ROW(state, {from_row_id, to_row_id}) {

		},
		MOVE_COL(state, {from_to_id, to_to_id}) {
		}


	},
	actions: {
	
	},
	getters: {

	}
}