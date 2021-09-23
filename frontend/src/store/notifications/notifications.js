import Vue from 'vue'
import Vuex from 'vuex'

import apiRoutes from '@/js/api-routes'

Vue.use(Vuex)

export const Notifications = {
  namespace: true,
  name: 'notifications',
  state: {
		//Main Loading Panel
		isLoadPanelVisible: false,
		
		//Home Spinning Loader
		spinner: false,

		// Toasts
		showAlert: false,
		alert: {},
		
		//Stacked Toasts
		snackBarStack: [],

		//Popups
		notificationPopup: {}
  },
  mutations: {
		OPEN_ALERT(state, payload) {
			state.snackBarStack.push({
				message: payload.msg,
				color: payload.color,
				timeout: 2500,
				left: true
			})
		},
		UPDATE_LOGIN_NOTIFICATIONS(state, payload) {
			state.updateLoginNotification = payload;
			console.log("updateLoginNotifications Message Payload in store.js:", payload);
		},
		NOTIFICATION_POPUP(state, payload) {
			console.log('NOTIFICATION_MESSAGES, payload', payload)
			state.notificationPopup = payload;
		}
  },
  actions: {
		openAlert({ commit, dispatch, rootState }, payload) {
			commit("OPEN_ALERT", payload)
		},
		notificationPopup({ commit, dispatch, rootState }, payload) {
			commit("NOTIFICATION_POPUP", payload)
		}
  },
  getters: {


  }
}
