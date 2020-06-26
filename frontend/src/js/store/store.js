import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import ENUM from "./enums";

//Import and Use Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import { Admin } from "./admin/admin";
import { Auth } from "./auth/auth";
import { Common } from "./common/common";
import { VTHPP } from "./vthpp/vthpp";
import { Invoices } from "./financial/invoices";
import { Receipts } from "./financial/receipts";
import { Financial } from "./financial/financial";
import { Datacom } from "./datacom/datacom";
import { Accounting } from "./accounting/accounting";
import { Users } from "./users/users";
import { Inventory } from "./inventory/inventory";
import { Orders } from "./orders/orders";
import { Companies } from "./companies/companies";
import { GroupsPermissions } from "./users/groups-permissions";
import { Emails } from "./emails/emails";

import ContentTypes from "./users/contenttypes";
import { Labels } from "./labels/labels";
import { Chat } from "./sockets/chat";
import { Locale } from "./common/locale";
import { Static } from "./common/static";
import { Errors } from "./common/errors";
import { Attendance } from "./attendance/attendance";
import { Notifications } from "./common/notifications";
import { Calendar } from "./calendar/calendar";

import { Leads } from "./leads/leads";
import { Warehouses } from "./warehouses/warehouses";
import { Partners } from "./partners/partners";
import { Vendors } from "./vendors/vendors";
import { Customers } from "./customers/customers";
import { SalesOffices } from "./sales-offices/sales-offices";

import { DragNDrop } from "./common/drag-n-drop/drag-n-drop";

export default new Vuex.Store({
	modules: {
		Errors,
		Admin,
		Auth,
		Users,
		Locale,
		Static,
		Inventory,
		Orders,
		Companies,
		GroupsPermissions,
		ContentTypes,
		Labels,
		Chat,
		Emails,
		Attendance,
		Calendar,
		Leads,
		Warehouses,
		Partners,
		Vendors,
		Customers,
		SalesOffices,
		Accounting,
		Financial,
		Datacom,
		VTHPP,
		Invoices,
		Receipts,
		Common,
		DragNDrop,
		Notifications,
	},
	state: {
		version: 1.0,
		apiState: ENUM.INIT,
		errorHandling: [],
		updateLoginNotification: null,
		notificationMesasages: null
	},
	mutations: {
		UPDATE_LOGIN_NOTIFICATIONS(state, payload) {
			state.updateLoginNotification = payload;
			console.log("updateLoginNotifications Message Payload in store.js:", payload);
		},
		NOTIFICATION_MESSAGES(state, payload) {
			state.notificationMesasages = payload;
		}
	},

	actions: {},
	getters: {}
});
