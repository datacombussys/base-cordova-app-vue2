<template>
	<div>
		<modal
			name="msgModal" 
			draggable 
			resizable
			:height="modal.height"
			:width="modal.width"
			:pivotY="modal.pivotY"
			:pivotX="modal.pivotX">
			<div  class="display-flex justify-content-end">
				<f7-link
					icon-size="40"
					icon-color="black"
					icon="mdi mdi-close"
					@click="hideModal"
				></f7-link>
			</div>
			<div class="page-content">
				<div
					v-bar="{
						preventParentScroll: true,
						scrollThrottle: 30
					}"
					style="height: 100%;">
					<!-- el1 -->
					<div>
					<!-- el2 -->
					<f7-block v-if="messageData.profile == null">
						<p>Nothing to show</p>
					</f7-block>
						<f7-block class="no-margin-top" v-if="messageData.profile != null">
							<f7-list class="no-margin-top">
								<!-- Header -->
								<f7-row class="header-row full-width">
									<f7-col width="70">
										<p class="field-title margin-top-half">Title: </p>
										<div class="message-field">
											{{ messageData.profile.title }}
										</div>
										<p class="field-title margin-top-half">From:</p>
										<div class="message-field">
											{{ messageData.profile.sender.full_name }}
										</div>
										<p class="field-title margin-top-half">To:</p>
										<div class="message-field">
											{{ messageData.profile.receiver.full_name }}
										</div>
									</f7-col>
									<f7-col width="30">
										<p class="field-title margin-top-half">Status:</p>
										<div class="message-field justify-content-center">
											<f7-badge size="50" color="green">Active</f7-badge>
										</div>
										<p class="field-title margin-top-half">Approved by:</p>
										<div class="message-field">
											Jordan Smith
										</div>
										<p class="field-title margin-top-half">Approved on:</p>
										<div class="message-field">
											02-25-2019
										</div>
										
									</f7-col>
								</f7-row>
								<!-- END Header -->

								<!-- Body -->
								<f7-row class="margin-top">
									<p class="field-title margin-top-half">Subject</p>
									<div class="message-field">{{ messageData.profile.subject }}</div>
									<p class="field-title margin-top-half">Message</p>
									<div class="message-field-body">{{ messageData.profile.body }}</div>
									
								</f7-row>
								<!-- END Body -->

								<!-- Footer -->
								<f7-row>

								</f7-row>
	
							</f7-list>
						</f7-block>
					</div>
				</div>
				<!-- END VueScrollbar -->
			</div>
		</modal>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';

//Components


export default {
	name: "notificationMessageComponent",
	mixins: [],
	components: {
	},
	props: {
		messageData: {
			type: Object,
			required: false
		}
	},
	data() {
		return {
			//Component Data

			//Main Data
			notificationMessageOpened: false,

			//Modal
			modal: {
				width: '80%',
				height: '60%',
				pivotY: 0.4,
				pivotX: 0.25
			}


		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm ");
		},
		hideModal() {
			this.$modal.hide('msgModal');
		}
	},
	computed: {
		...mapState(["Auth", "Invoices"]),
		...mapGetters(["GET_INVOICE_LIST"])
	},
	created() {

	},
	mounted() {
	
	}
};
</script>

<style scoped lang="less">
#page-header-row {
	cursor: move;
}

.message-field {
	background: rgb(255, 255, 255);
	border: 1px solid rgba(0, 0, 0, 0.6);
	border-radius: 4px;
	min-height: 30px;
	width: 100%;
	padding: 6px;
	text-align: left;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.message-field-body {
	background: rgba(255, 255, 255);
	border: 1px solid rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	min-height: 175px;
	width: 100%;
	padding: 6px;
	text-align: left;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.status-box {
	background: rgba(255, 255, 255);
	border: 1px solid, black;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	width: 100%;
	height: 125px;
	margin-top: 20px;
}
.badge {
	min-height: 25px;
	min-width: 90px;
	font-size: 1em;
	font-weight: 900;
	padding: 6px;
}

</style>
