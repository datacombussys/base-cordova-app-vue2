import { f7 } from 'framework7-vue'

import store from "@/js/store/store";
import Axios from 'axios';

store.subscribe(mutation => {
	//If Successful Login
	if (mutation.type === 'UPDATE_LOGIN_NOTIFICATIONS') {
		console.log("state.UPDATE_LOGIN_NOTIFICATIONS has been set to:", mutation);

		// Alert Dialog Box
		// f7.dialog.alert("You have successfully logged in", () => {
		// 	f7.views.main.router.back();
		// });

		//f7 Toast
		f7.toast.create({
        text: "You have successfully logged in",
        position: 'bottom',
        closeTimeout: 5000,
        closeButton: true,
        closeButtonColor: 'red',
				}).open();
				
		//If Successful User Sugn-In, Retrieve Profile data
		if (mutation.payload != null) {
				// Header Set in axios.js file, I may ned to modily this action
				Axios.defaults.headers.common['Authorization'] = 'Token ${mutation.payload}';
				store.dispatch('getUserInfo')
			} else {
				Axios.defaults.headers.common['Authorization'] = null
			}
			//Unsuccessful Login
	} 
	if (mutation.type === 'UPDATE_NOTIFICATIONS') {
		f7.toast.create({
			text: mutation.payload,
			position: 'bottom',
			closeTimeout: 5000,
			closeButton: true,
			closeButtonColor: 'red',
			}).open();
			console.log("The updateNotification Toast was fired");


	}
	if (mutation.type === 'NOTIFICATION_MESSAGES') {
		var notificationFull = f7.notification.create({
			icon: '<img src="/static/Databoxxlogo30x30.png">',
			title: 'Databoxx',
			titleRightText: 'now',
			subtitle: mutation.payload,
			text: 'Click to close',
			closeOnClick: true,
			closeTimeout: 6000,
			swipeToClose: true,
		});
		// Open it
	notificationFull.open();
			console.log("The NOTIFICATION_MESSAGE Message was fired");
	}
});
