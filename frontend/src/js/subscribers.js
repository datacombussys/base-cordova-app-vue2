import Vue from 'vue'
import store from "@/store";
import VuetifyDialog from 'vuetify-dialog'


// console.log('this', this)
// console.log('VuetifyDialog', VuetifyDialog)

store.subscribe((mutation) => {
	// console.log("store.subscribe")
	// console.log("store", store)
	// console.log("Vue.prototype.$dialog", Vue.prototype.$dialog)
	
	//If Successful Login
	if (mutation.type === 'UPDATE_LOGIN_NOTIFICATIONS') {
		console.log("state.UPDATE_LOGIN_NOTIFICATIONS has been set to:", mutation);
		Vue.prototype.$dialog.confirm({
			text: 'You have logged in',
			title: 'Success'
		});
				
	} 
	if (mutation.type === 'UPDATE_NOTIFICATIONS') {
		// console.log("Unsuccessful login subscribers:")
		// console.log("store", store)
		// console.log('VuetifyDialog', VuetifyDialog)
		Vue.prototype.$dialog.notify[mutation.payload.color](mutation.payload.msg, {
			position: 'bottom-left',
			timeout: 5000
		});

	}
	if (mutation.type === 'NOTIFICATION_MESSAGES') {
		console.log("Notification Messages subscribers:")
		Vue.prototype.$dialog.confirm({
			title: mutation.payload['title'].charAt(0).toUpperCase() + mutation.payload['title'].slice(1),
			text: mutation.payload.text
			
		});

	}
});

