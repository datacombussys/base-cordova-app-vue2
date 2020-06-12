import { f7 } from 'framework7-vue';
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios
import axios from "axios";

export const Calendar = {
	namespace: true,
	state: {
		workScheduleCalendarList: [],
		events: [],
		calendarArgs: null,

	},
	mutations: {
		CREATE_EVENT(state, payload) {
			console.log('state.events', state.events);
			state.events.push(payload);
			console.log('state.events', state.events);
		},
		SET_CALENDAR_ARGS(state, payload) {
			state.calendarArgs = payload;
		}

	},
	actions: { 


	},
	getters: {
		GETEVENTS(state) {
			return state.events;
		}
	}
}