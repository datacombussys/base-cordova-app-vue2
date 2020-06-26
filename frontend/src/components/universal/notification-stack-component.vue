<template>
	<div>
		<div 
			class="popup notification-stack" 
			data-animate="false"
			data-close-by-backdrop-click="true"
			data-backdrop="false"
			data-swipe-to-close="true"
			data-close-on-escape="true">
			<div class="view">
				<div class="page">
					<f7-row class="display-flex justify-content-end">
						<div class="triangle"></div>
					</f7-row>

					<f7-row class="display-flex justify-content-end close-box">
						<f7-link
							icon-size="30"
							icon-color="white"
							icon="mdi mdi-close"
							popup-close
							class="close-x"
						></f7-link>
		
					</f7-row>
					<f7-row>
					</f7-row>
					<div class="page-content">
						<div
							v-bar="{
								preventParentScroll: true,
								scrollThrottle: 30
							}"
							style="height: 100%; padding-left: 15px;">
							<!-- el1 -->
							<div>
							<!-- el2 -->
								<f7-list media-list>
									<f7-row v-for="msg in messageData.list" :key="msg.id">
										<f7-list-item
											link="#"
											:title="msg.title"
											:after="msg.date_sent | moment('MM/DD/YYYY')"
											:subtitle="msg.subtitle"
											:text=" msg.body"
											@click="openMessage(msg.id)"
											class="notificationItem newItem"
											popup-close
											>
										</f7-list-item>
									</f7-row>
									
								</f7-list>

								<!-- NOT Authenticated -->
								<f7-row 
									v-if="!Auth.isAuthenticated && GET_NEW_NOTIFICATIONS_LIST_LENGTH === 0 && !loading"
									class="display-flex justify-content-center">
									<f7-col width="100">
										<div class="text-align-center error-text">No messages to display</div>
										<p class="text-align-center">(Please log in)</p>
									</f7-col>
								</f7-row>
								<!-- Notifications -->

								<!-- Authenticated No Messages-->
								<f7-row 
									v-if="Auth.isAuthenticated && GET_NEW_NOTIFICATIONS_LIST_LENGTH === 0 && !loading"
									class="display-flex justify-content-center">
									<f7-col width="100">
										<div class="text-align-center error-text">No messages</div>
									</f7-col>
								</f7-row>
								<!-- END Authenticated No Messages-->

							</div>
						</div>
					</div>
				</div>
			</div>

		</div>


		<!-- <notification-message-component :messageData="messageData"></notification-message-component> -->

	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';

//Components
// import notificationMessageComponent from '@/components/universal/notification-message-component.vue';


export default {
	name: "notificationStackComponent",
	mixins: [],
	components: {
		// "notification-message-component": notificationMessageComponent
	},
	props: {
	},
	data() {
		return {
			//Component Data
			messageData: {
				list: null,
				profile: null
			},

			//Main Data
			loading: false,
			notificationPopupOpened: false,

		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		},
		openMessage(e) {
			console.log('openMessage e', e);
			//Populate messageData with the data to be sent into the meaasge reading modal
			let message = this.GET_NEW_NOTIFICATIONS_LIST.find(elem => elem.id == e);
			console.log("message", message);
			this.messageData.profile = message;
			console.log("this.messageData", this.messageData);

			this.$f7.popup.open('.notification-message');
		}
	},
	computed: {
		...mapState(["Auth", "Commons"]),
		...mapGetters(["GET_NEW_NOTIFICATIONS_LIST", "GET_NEW_NOTIFICATIONS_LIST_LENGTH"]),
		listData() {
			return this.$store.getters.GET_NEW_NOTIFICATIONS_LIST;
		}
	},
	watch: {
		listData(newVal, oldVal) {
			this.messageData.list = this.listData;
			this.messageData.profile = this.listData[0];
			this.loading = false;
		}
	},
	created() {
		if(this.Auth.isAuthenticated) {
			this.loading = true;
		}
	},
	mounted() {}
};
</script>

<style scoped lang="less">
.page {
	background-color: rgba(180, 158, 158, 0.00);
	background: rgba(180, 158, 158, 0.00);
}

.notification-stack {
	background: white;
	left: 103%;
	top: 40.5%;
	width: 250px;
	max-height: 50%;
		background-color: rgba(180, 158, 158, 0.00);
	background: rgba(180, 158, 158, 0.00);
}
.notificationItem {
	background: rgb(255, 255, 255);
	height: 125px;
}
.newItem {
	border-left: 10px solid rgb(4, 217, 224);
}
.triangle {
	width: 0;
	height: 0;
	margin-right: 30px;
	border-left: 20px solid transparent;
	border-right:20px solid transparent;
	border-bottom: 15px solid rgb(6, 68, 85);
	background-color: rgba(180, 158, 158, 0.00);
	background: rgba(180, 158, 158, 0.00);
}

.close-box {
	width: 100%;
	background: rgb(6, 68, 85);
	border-radius: 15px 15px 0px 0px;
}
.close-x {
	margin-right: 34px;
}


</style>
