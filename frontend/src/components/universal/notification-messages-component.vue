<template>
	<div>
		<b-tabs type="is-boxed" class="b-tab-header">
			<b-tab-item class="b-tab-item">
				<template slot="header">
					<f7-row class="display-flex align-items-center">
						<b-icon icon="email-alert" size="is-medium"></b-icon>
						<span> New Messages <b-tag rounded> 3 </b-tag> </span>
					</f7-row>
				</template>
				<f7-row class="display-flex align-content-flex-start">
					<f7-row class="full-width header-row-format padding-half">
						<f7-col width="20" class="padding-left">
							<p class="msg-header-text">Archive</p>
						</f7-col>
						<f7-col width="40">
							<p class="msg-header-text">Notification</p>
						</f7-col>
						<f7-col width="40" class="padding-right">
							<p class="msg-header-text text-align-right">Approve/Decline</p>
						</f7-col>
					</f7-row>
					<div
						v-bar="{
							preventParentScroll: false,
							scrollThrottle: 30
						}"
						class="message-rows-box"
						style="height:250px; width: 100%; padding-left: 15px;"
					>
						<!-- el1 -->
						<div>
						<!-- el2 -->
							<!-- PreLoader -->
							<f7-block v-if="loading" class="align-items-center no-margin full-height">
								<!-- <f7-preloader size="50" color="blue"></f7-preloader> -->
								<f7-list media-list class="skeleton-text skeleton-effect-blink no-margin-top">
									<f7-list-item
										title="Title"
										subtitle="Subtitle"
										text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
										class="display-flex justify-content-start">
										<f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
									</f7-list-item>
									<f7-list-item
										title="Title"
										subtitle="Subtitle"
										text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
									>
										<f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
									</f7-list-item>
								</f7-list>
							</f7-block>

							<f7-row class="full-width">
								<f7-col width="100">

									<f7-list media-list class="no-margin full-width">
										<f7-row v-for="msg in messageData.list" :key="msg.id" :class="!msg.read ? 'unread-msg' : ''" class="display-flex justify-content-space-evenly align-items-center row-format">
											<div class="checkbox-col display-flex justify-content-center">
												<f7-list-item class="display-flex justify-content-center" checkbox></f7-list-item>
											</div>
											<div class="message-col">
												<f7-list-item
													link="#"
													:title="msg.title"
													:after="msg.date_sent | moment('MM/DD/YYYY')"
													:subtitle="msg.subtitle"
													:text=" msg.body"
													@click="openMessage(msg.id)"
													class="msg-preview"
												></f7-list-item>
											</div>
											<div class="approval-col">
												<f7-link icon-only @click="testingMethod">
													<b-icon class="margin-half" icon="thumb-up-outline" size="is-medium" type="is-dark"></b-icon>
												</f7-link>
												<f7-link icon-only @click="testingMethod">
													<b-icon class="margin-half" icon="thumb-down-outline" size="is-medium" type="is-dark"></b-icon>
												</f7-link>
											
											
											</div>
										</f7-row>
										
									</f7-list>

									<!-- NOT Authenticated -->
									<f7-card v-if="!Auth.isAuthenticated && GET_NOTIFICATIONS_LIST_LENGTH === 0 && !loading">
										<f7-card-content>
											<f7-row class="display-flex justify-content-center">
												<f7-col width="100">
													<div class="text-align-center error-text">No messages to display</div>
													<p class="text-align-center">(Please log in)</p>
												</f7-col>
											</f7-row>
										</f7-card-content>
									</f7-card>
									<!-- Notifications -->
									
									<!-- Authenticated No Messages-->
									<f7-card v-if="Auth.isAuthenticated && GET_NOTIFICATIONS_LIST_LENGTH === 0 && !loading">
										<f7-card-content>
											<f7-row class="display-flex justify-content-center">
												<f7-col width="100">
													<div class="text-align-center error-text">No messages to display</div>
												</f7-col>
											</f7-row>
										</f7-card-content>
									</f7-card>
									<!-- END Authenticated No Messages-->
								</f7-col>
							</f7-row>

						</div>
					</div>
					<!-- END Vue Scrollbar Container -->
				</f7-row>
			</b-tab-item>
			
			<b-tab-item>
				<template slot="header">
					<f7-row class="display-flex align-items-center">
						<b-icon icon="email-lock" size="is-medium"></b-icon>
						<span> Archived Messages <b-tag rounded> 135 </b-tag> </span>
					</f7-row>
				</template>
				<!-- Archived Messages -->
				<f7-row class="display-flex align-content-flex-start">
					<f7-row class="full-width header-row-format padding-half">
						<f7-col width="20" class="padding-left">
							<p class="msg-header-text">Delete</p>
						</f7-col>
						<f7-col width="40">
							<p class="msg-header-text">Notification</p>
						</f7-col>
						<f7-col width="40" class="padding-right">
							<p class="msg-header-text text-align-right">Status</p>
						</f7-col>
					</f7-row>
					<div
						v-bar="{
							preventParentScroll: false,
							scrollThrottle: 30
						}"
						class="message-rows-box"
						style="height:250px; width: 100%;"
					>
						<!-- el1 -->
						<div>
						<!-- el2 -->
							<!-- PreLoader -->
							<f7-block v-if="loading" class="align-items-center no-margin full-height">
								<!-- <f7-preloader size="50" color="blue"></f7-preloader> -->
								<f7-list media-list class="skeleton-text skeleton-effect-blink">
									<f7-list-item
										title="Title"
										subtitle="Subtitle"
										text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
										class="display-flex justify-content-start">
										<f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
									</f7-list-item>
									<f7-list-item
										title="Title"
										subtitle="Subtitle"
										text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
									>
										<f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
									</f7-list-item>
								</f7-list>
							</f7-block>

							<f7-row class="full-width">
								<f7-col width="100">

									<f7-list media-list class="no-margin full-width">
										<f7-row v-for="msg in messageData.list" :key="msg.id" :class="!msg.read ? 'unread-msg' : ''" class="display-flex justify-content-space-evenly align-items-center row-format">
											<div class="checkbox-col display-flex justify-content-center">
												<f7-link icon-only @click="deleteMessage(msg.id)">
													<f7-icon size="50" icon="mdi mdi-trash-can-outline">
													</f7-icon>
												</f7-link>
											</div>
											<div class="message-col">
												<f7-list-item
													link="#"
													:title="msg.title"
													:after="msg.date_sent | moment('MM/DD/YYYY')"
													:subtitle="msg.subtitle"
													:text=" msg.body"
													@click="openMessage(msg.id)"
													class="msg-preview"
												></f7-list-item>
											</div>
											<div class="approval-col">
												<b-tag v-if="msg.is_approved" size="is-medium" :type="is-danger">Approved</b-tag>
												<b-tag v-if="msg.is_declined" size="is-medium" :type="is-danger">Declined</b-tag>
												<b-tag v-if="!msg.is_declined && !msg.is_declined" size="is-medium" :type="is-warning">No Status</b-tag>
											</div>
										</f7-row>
										
									</f7-list>

									<!-- NOT Authenticated -->
									<f7-card v-if="!Auth.isAuthenticated && GET_NOTIFICATIONS_LIST_LENGTH === 0 && !loading">
										<f7-card-content>
											<f7-row class="display-flex justify-content-center">
												<f7-col width="100">
													<div class="text-align-center error-text">No messages to display</div>
													<p class="text-align-center">(Please log in)</p>
												</f7-col>
											</f7-row>
										</f7-card-content>
									</f7-card>
									<!-- Notifications -->
									
									<!-- Authenticated No Messages-->
									<f7-card v-if="Auth.isAuthenticated && GET_NOTIFICATIONS_LIST_LENGTH === 0 && !loading">
										<f7-card-content>
											<f7-row class="display-flex justify-content-center">
												<f7-col width="100">
													<div class="text-align-center error-text">No messages to display</div>
												</f7-col>
											</f7-row>
										</f7-card-content>
									</f7-card>
									<!-- END Authenticated No Messages-->
								</f7-col>
							</f7-row>

						</div>
					</div>
					<!-- END Vue Scrollbar Container -->
				</f7-row>
			</b-tab-item>
		</b-tabs>

	<notification-message-component :messageData="messageData"></notification-message-component>

	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';
var moment = require("moment");

//Components
import notificationMessageComponent from '@/components/universal/notification-message-component.vue';

export default {
	name: "notificationMessagesComponent",
	mixins: [],
	components: {
		"notification-message-component": notificationMessageComponent,
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


		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.$f7", this.$f7);
			console.log("this.messageData", this.messageData);
			console.log("this.loading", this.loading);			
		},
		changeClass(e) {
			console.log('e', e);
		},
		formatObject(id) {
			//Populate messageData with the data to be sent into the meaasge reading modal
			let message = this.GET_NOTIFICATIONS_LIST.find(elem => elem.id == id);
			console.log("message", message);

			var newMsg = JSON.parse(JSON.stringify(message));
			
			delete newMsg.sender;
			delete newMsg.receiver;
			newMsg['sender'] = message.sender.id;
			newMsg['receiver'] = message.receiver.id;

			//Populate the Data Object
			this.messageData.profile = message;

			console.log("this.messageData", this.messageData.profile);
			console.log("newMsg", newMsg);

			return newMsg;
		},
		openMessage(id) {
			console.log('openMessage id', id);
			let response = this.formatObject(id);
			response.read = true;
			console.log("response", response);

			// this.$f7.popup.open('.notification-message');
			this.$modal.show('msgModal');
			this.$store.dispatch('PATCHNotification', response);
		},
		archiveMessage(id) {
			console.log("archiveMessage id", id);
			let response = this.formatObject(id);

			response.archived = true;
			this.$store.dispatch('PATCHNotification', response);
		},
		approveMessage(id) {
			console.log("approveMessage id", id);
			let response = this.formatObject(id);

			response.is_approved = true;
			response.is_declined = false;
			date.toISOString();
			response.date_disposition = date;
			this.$store.dispatch('PATCHNotification', response);
		},
		declineMessage(id) {
			console.log("declineMessage id", id);
			let response = this.formatObject(id);

			response.is_declined = true;
			response.is_approved = false;
			let date = new Date();
			date.toISOString();
			response.date_disposition = date;
			this.$store.dispatch('PATCHNotification', response);
		},
		deleteMessage(id) {
			console.log("deleteMessage id", id);
			this.$store.diapatch('DELETENotification', {'id': id});
		}

	},
	computed: {
		...mapState(["Auth", "Common"]),
		...mapGetters(["GET_NOTIFICATIONS_LIST", "GET_NOTIFICATIONS_LIST_LENGTH"]),
		listData() {
			return this.$store.getters.GET_NOTIFICATIONS_LIST;
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

	}
	
};
</script>

<style scoped lang="less">
.b-tab-header {
	// background: rgb(209, 209, 209);
	max-width: 900px;
} 
.b-tab-item {
	color: rgb(83, 83, 83);
}

.notification-message {
	border-bottom: 1px solid black;
}
.checkbox-col {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 10%;
	height: 100%;
}
.message-col {
	width: 70%;
}
.approval-col {
	display: flex;
	justify-content: center;
	align-items: center;
	width:20%;
	height: 100%;
}
label.item-checkbox{
	.icon-checkbox {
	margin: 0px;
	}
} 
.header-row-format {
	border-bottom: 2px solid rgba(37, 37, 37, 0.9);
	background: rgb(80, 80, 80);
}
.row-format {
	border-right: 4px solid rgba(73, 71, 71, 0.5);
	border-bottom: 4px solid rgba(73, 71, 71, 0.3);
	
	background: white;
}
.msg-header-text {
	font-weight: 900;
	color: white;
}
.message-rows-box {
	border-right: 4px solid rgba(73, 71, 71, 0.5);
	border-left: 4px solid rgba(73, 71, 71, 0.5);
	border-bottom: 4px solid rgba(73, 71, 71, 0.5);
	border-top: 4px solid rgba(73, 71, 71, 0.5);
}
.unread-msg {
	border-left: 15px solid rgb(4, 219, 226);
}

</style>
