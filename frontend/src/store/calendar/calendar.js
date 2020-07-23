;
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//Import and Use Axios


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
		GET_EVENTS(state) {
			return state.events;
		}
	}
}