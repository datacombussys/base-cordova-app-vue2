//GET request Template
import store from 'vuex';
import axios from 'axios';
console.log('store', store);


export default {
	
	get(dispatch, rootState, endpoint, payload, type) {
		return new Promise((resolve, reject) => {
			console.log('getCustomerList payload', payload);
			var platform = rootState.Auth.platformInfo;
			if(!rootState.Auth.isAuthenticated) {
				let error = {};
				error.type = "Login Required";
				error.status = 2000;
				// dispatch('updateNotification', error);
				return reject(error);
			} 
			var url = platform.url;
			if(payload != undefined) {
				url = payload.url;
			}
			axios.get("/django/"+ endpoint + url).then(response => {
				if (response.status === 200) {
					response.type = type;
					console.group("This was successful!!!");
					dispatch('updateNotification', response);

					return resolve(response);
				}
			}).catch(error => {
				if (error.response) {
					error.type = type;
					dispatch('updateNotification', error.response);
					return reject(error);
				}
			});
		});
	}
		

}
