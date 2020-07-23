<template>
	<div>
		<!-- Product Image Upload Sheet -->
		<f7-sheet
			class="edit-profile-image image-sheet"
			:opened="profileImageSheetOpened"
			@sheet:closed="profileImageSheetOpened = false"
		>
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content class="padding-bottom">
				<section>
					<div class="block">
						<button class="button" fill @click="activeStep = 0">Start Over</button>
					</div>
					<b-steps
						v-model="activeStep"
						:animated="isAnimated"
						:has-navigation="hasNavigation"
						:icon-prev="prevIcon"
						:icon-next="nextIcon"
					>
						<b-step-item label="Choose Image" :clickable="isStepsClickable">
							<div class="left" v-if="uploadMessage" :class="`message ${error ? 'is-danger' : 'is-success'}`">
								<div class="message-body">{{ uploadMessage }}</div>
							</div>
							<f7-block>
								<form enctype="multipart/form-data">
									<f7-row class="justify-content-center">
										<div class="dropzone">
											<input type="file" name="invArray" @change="selectFile" ref="invFile" class="input-field" />

											<p v-if="!uploading" class="call-to-action">
												Drop file here
											</p>
											<p v-if="uploading" class="progress-bar is-primary" :value="progress" max="100">
												<progress class="progress"> </progress>
												{{ progress }} %
											</p>
										</div>
										<f7-row>
											<f7-col width="100">
												<div v-if="file" class="file-name" style="font-size:3rem;">{{ file.name }}</div>
											</f7-col>
										</f7-row>
									</f7-row>
								</form>
							</f7-block>
						</b-step-item>

						<b-step-item label="Resize Image" :clickable="isStepsClickable" :type="{ 'is-success': isProfileSuccess }">
							<template>
								<f7-row>
									<f7-col width="50">
										<!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
										<vue-croppie
											ref="croppieRefInv"
											:enableOrientation="true"
											:boundary="{ width: 500, height: 500 }"
											:viewport="{ width: 300, height: 300, type: 'circle' }"
											@result="result"
											@update="update"
										>
										</vue-croppie>
										<f7-button fill @click="crop()">Crop</f7-button>
									</f7-col>
									<f7-col width="50">
										<!-- the result -->
										<f7-row v-if="cropped">
											<f7-col class="display-flex justify-content-center">
												<img v-bind:src="cropped" />
											</f7-col>
										</f7-row>
									</f7-col>
								</f7-row>
							</template>
						</b-step-item>

						<b-step-item label="Upload Image" :clickable="isStepsClickable" disabled>
							<!-- the result -->
							<f7-row v-if="cropped">
								<f7-col class="display-flex justify-content-center">
									<img v-bind:src="cropped" />
								</f7-col>
							</f7-row>
							<f7-row v-if="!cropped">
								<f7-col class="display-flex justify-content-center">
									<p style="font-size: 30px;">You have not cropped an image. Please go back and click "Cropped".</p>
								</f7-col>
							</f7-row>
						</b-step-item>

						<!-- navigation Links -->
						<template v-if="customNavigation" slot="navigation" slot-scope="{ previous, next }">
							<f7-row class="display-flex justify-content-space-around">
								<f7-col width="25" class="imageNavButtons">
									<b-button
										v-if="!previous.disabled"
										class="display-flex justify-content-center"
										outlined
										type="is-danger"
										icon-pack="mdi"
										icon-left="arrow-left-box"
										size="is-large"
										:disabled="previous.disabled"
										@click.prevent="previous.action"
									>
										<span>Previous</span>
									</b-button>
								</f7-col>
								<f7-col width="25" class="imageNavButtons">
									<b-button
										v-if="!next.disabled"
										class="display-flex justify-content-center"
										outlined
										type="is-success"
										icon-pack="mdi"
										size="is-large"
										icon-left="arrow-right-box"
										:disabled="next.disabled"
										@click.prevent="next.action"
									>
										<span>Next</span>
									</b-button>
									<div>
										<f7-button
											class="display-flex justify-content-center"
											v-if="next.disabled"
											large
											fill
											sheet-close
											@click.prevent="sendFile"
											>Submit
										</f7-button>
									</div>
									
								</f7-col>
							</f7-row>
						</template>
						<!-- END navigation Links -->
					</b-steps>
				</section>
				<f7-block class="margin-bottom"></f7-block>
			</f7-page-content>
			<!-- END Product Sheet Content -->
		</f7-sheet>
		<!-- END Image Upload Sheet -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

import axios from "axios";

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components


export default {
	name: "profileImagePopupComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
		profileData: {
			type: Object,
			required: true,
		},
		profileImageSettings: {
			type: Object,
			required: true
		}

	},
	data() {
		return {
			//Component Data

			//Main Data
			progress: 0,
			file: "",
			fileURL: "",
			files: [],
			uploading: false,
			uploadMessage: "",
			profileImageSheetOpened: false,
			activeStep: 0,
			isAnimated: true,
			hasNavigation: true,
			customNavigation: true,
			prevIcon: "chevron-left",
			nextIcon: "chevron-right",
			isStepsClickable: false,
			isProfileSuccess: false,
			//Image Cropping
			cropped: null,
			image: null,
			altIMage: "/static/test.png",
			



		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},
		resetFields() {
			this.file = "";
			this.cropped = "";
			this.fileURL = "";
			this.activeStep = 0;
		},
		selectFile(e) {
			//Get image URL and send to bind method
			console.log("Event", e);
			let newImageFile = e.target.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(newImageFile);
			reader.onload = (e) => {
				this.fileURL = e.target.result;
				this.bind();
			};
			//Get Image object and validate then send
			this.file = this.$refs.invFile.files[0];
			const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
			const MAX_SIZE = 2000000;
			const tooLarge = this.file.size > MAX_SIZE;

			if (allowedFileTypes.includes(this.file.type) && !tooLarge) {
				this.error = false;
				this.uploadMessage = "";
			} else {
				this.error = true;
				this.uploadMessage = toolarge ? `Too large, Max size is ${MAX_SIZE / 1000}kb` : "Only Images are allowed";
			}
		},

		sendFile() {
			this.profileData.profile_img = this.cropped;
			console.log("this.profileData", this.profileData);
			var formdata = this.profileData;
			console.log("formdata", formdata);
			var endpoint = this.profileImageSettings.url;
			console.log("endpoint", endpoint);
			

			try {
				axios.patch("/django/" + endpoint + formdata.id + "/", this.profileData).then((response) => {
					console.log(`${this.profileImageSettings.module} Image PATCH response`, response);
					// this.$store.dispatch("GETPartnerList");
					response.type = this.profileImageSettings.module + "Profile Image";
					this.$store.dispatch("updateNotification", response);
				});
				// this.uploadMessage = "File has been uploaded";
				this.file = "";
				this.cropped = "";
				this.fileURL = "";
				this.activeStep = 0;
			} catch (err) {
				if(err.response) {
					this.uploadMessage = `There was an error uploading ${err.response.data.error}`;
					console.log("Error Uploading", err.response.data.error);
				} else {
					this.uploadMessage = `There was an error uploading ${err.data}`;
					console.log("Error Uploading", err);
					console.log("Error Uploading", err.response);
					
				}
				// this.$f7.dialog.alert("There was an error uploading the image"),open();
				console.log("Error Uploading", err);
				console.log("Error Uploading", err.response);
				// console.log("Error Uploading", err.data.error);
				this.error = true;
			}
		},
		
		//Croppie JS Image Cropper
		bind() {
			var $$ = this.Dom7;
			// Bind image to Cropper
			console.log("this.fileURL from bind()", this.fileURL);
			this.$refs.croppieRefInv
				.bind({
					url: this.fileURL
				})
				.then(() => {
					$$(".cr-slider").attr({ min: 0.15, max: 3 });
				});
		},


		// Croppie JS CALLBACK USAGE
		crop() {
			// Here we are getting the result via callback function
			// and set the result to this.cropped which is being
			// used to display the result above.
			let options = {
				format: "png",
				circle: true
			};
			this.$refs.croppieRefInv.result(options, (output) => {
				this.cropped = output;
			});
		},
		// Croppie JS EVENT USAGE
		cropViaEvent() {
			this.$refs.croppieRefInv.result(options);
		},
		result(output) {
			this.cropped = output;
		},
		update(val) {
			console.log(val);
		},
		rotate(rotationAngle) {
			// Rotates the image
			this.$refs.croppieRefInv.rotate(rotationAngle);
		},


	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters([])

	},
	created() {

	},
	async mounted() {
		// function to put an initial image on the canvas for Croppie.js.
		this.$refs.croppieRefInv.bind({
			url: "http://datacom.localhost.mydataboxx.com:9000/static/UserProfileGrey170x170.png"
		});
		
	}
};
</script>

<style scoped lang="less">
.image-sheet {
	height: 100vh;
}
.imageNavButtons {
	.button {
		height: 75px;
		align-content: center;
	}
}
.input-field {
	opacity: 0;
	width: 100%;
	height: 200px;
	position: absolute;
	cursor: pointer;
}
.file-input {
	cursor: pointer;
}
.file-cta {
	width: 100vw;
}
.file-name {
	width: 100vw;
}
.dropzone {
	min-height: 200px;
	padding: 10px 10px;
	position: relative;
	cursor: pointer;
	outline: 2px dashed grey;
	outline-offset: -10px;
	width: 90%;
	background: lightcyan;
	color: dimgray;
	&:hover {
		background: lightblue;
	}
	& .call-to-action {
		font-size: 2rem;
		text-align: center;
		padding-top: 50px;
	}
}
</style>
