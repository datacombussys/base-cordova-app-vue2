import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { Admin } from "./admin/admin";
import { Auth } from "./auth/auth";
import { Errors } from "./common/errors";
import { Statistics } from "./stats/statistics";

import { Common } from "./common/common";
import { VTHPP } from "./vthpp/vthpp";
import { RetailPOS } from './retail-pos/retail-pos';
import { Invoices } from "./financial/invoices";
import { Receipts } from "./financial/receipts";
import { Financial } from "./financial/financial";
import { Accounting } from "./accounting/accounting";
import { Inventory } from "./inventory/inventory";
import { Orders } from "./orders/orders";
import { GroupsPermissions } from "./users/groups-permissions";
import { Emails } from "./emails/emails";

import ContentTypes from "./users/contenttypes";
import { Labels } from "./labels/labels";
import { Chat } from "./sockets/chat";
import { Locale } from "./common/locale";
import { Static } from "./common/static";

import { Attendance } from "./attendance/attendance";
import { Notifications } from "./common/notifications";
import { Calendar } from "./calendar/calendar";

import { Datacom } from "./datacom/datacom";
import { Warehouses } from "./warehouses/warehouses";
import { Merchants } from "./merchants/merchants";
import { Partners } from "./partners/partners";
import { Vendors } from "./vendors/vendors";
import { Customers } from "./customers/customers";
import { Users } from "./users/users";
import { Employees } from "./employees/employees";
import { SalesOffices } from "./sales-offices/sales-offices";
import { Leads } from "./leads/leads";

import { DragNDrop } from "./common/drag-n-drop/drag-n-drop";

export default new Vuex.Store({
  modules: {
		Accounting,
		Admin,
		Attendance,
		Auth,
		Calendar,
		Chat,
		Merchants,
		Common,
		ContentTypes,
		Customers,
		Datacom,
		DragNDrop,
		Emails,
		Employees,
		Errors,
		Financial,
		GroupsPermissions,
		Inventory,
		Invoices,
		Locale,
		Labels,
		Leads,
		Notifications,
		Orders,
		Partners,
		RetailPOS,
		Receipts,
		SalesOffices,
		Static,
		Statistics,
		Users,
		Vendors,
		VTHPP,
		Warehouses,


	},
	state: {
		version: 1.0,
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
			console.log('NOTIFICATION_MESSAGES, payload', payload)
			state.notificationMesasages = payload;
		}
	},

	actions: {},
	getters: {}
});
