<template>
	<v-bottom-sheet v-model="openImageSheet">
		<v-sheet class="text-center" height="100vh">
			<nav class="close-image-button">
				<div class="header">
					Add Profile Image
				</div>
				<div class="button">
					<a href="#" @click="closeSheet">
						<fa-layer class="mdi-35">
							<fa-icon :icon="['fas', 'circle']" style="color:#F75403;"></fa-icon>
							<fa-icon :icon="['fas', 'times']" style="color:white;" data-fa-transform="shrink-6"></fa-icon>
						</fa-layer>
					</a>
				</div>
			</nav>
			<!-- <v-btn
				class="mt-6"
				text
				color="red"
				@click="closeSheet"
			>close</v-btn> -->
		
			<v-stepper v-model="step" light>
				<v-stepper-header>
					<v-stepper-step :complete="step > 1" step="1">Select Image</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step :complete="step > 2" step="2">Resize Image</v-stepper-step>
				</v-stepper-header>

				<v-stepper-items>
					<!-- Step 1 Select Image -->
					<v-stepper-content step="1">
						<v-card
							class="mb-4 profile-image-cards"
							color="grey lighten-1"
						>
							<div class="row" v-if="uploadMessage">
								<div class="message danger">
									<div class="message-text">
										{{ uploadMessage }}
									</div>
								</div>
							</div>
							<v-alert
			
								outlined
								type="error"
							>
								I'm a dense alert with the <strong>outlined</strong> prop and a <strong>type</strong> of error
							</v-alert>
							<div>
								<form enctype="multipart/form-data">
									<div class="row">
										<div class="col-12 flex justify-center">
											<div class="dropzone">
												<input type="file" name="invArray" @change="selectFile" ref="invFile" class="input-field" />
												<div class="row" v-if="file.length != 0">
													<div class="col-5">
														<div class="row">
															<div class="col-2">
																<i class="material-icons mdi-50">insert_photo</i>
															</div>
															<div class="col-10 flex justify-start items-center">
																	<div style="font-size:1.25rem;">File Name:</div>
																	<p v-if="file" style="font-size:1.5rem;">{{ file.name }}</p>
															</div>
														</div>
													</div>
													<div class="col-7">
														<p v-if="!uploading" class="call-to-action flex justify-start">
															Drop File Here
														</p>
													</div>
												</div>
												<div class="row" v-else>
													<div class="col-12">
														<p v-if="!uploading" class="call-to-action">
															Drop File Here
														</p>
													</div>
													
												</div>
												<div class="row">
													<p v-if="uploading" class="progress-bar" :value="progress" max="100">
														<progress class="progress"> </progress>
														{{ progress }} %
													</p>
												</div>

											</div>
										</div>
										
									</div>
								</form>
							</div>
							<div class="row">
								<DxButton
									:width="150"
									class="ml-4"
									text="Test"
									type="danger"
									styling-mode="contained"
									:focusStateEnabled="false"
									@click="testingMethod">
								</DxButton>
							</div>
						</v-card>
						<div class="row justify-end">
							<div class="col-4 text-center">
								<v-btn 
									@click="closeSheet"
									text>
									Cancel
								</v-btn>
								<v-btn
									color="primary"
									@click="step = 2">
									Continue
								</v-btn>
							</div>
						</div>
					</v-stepper-content>
					<v-stepper-content step="2">
						<v-card
							class="mb-4 profile-image-cards"
							color="grey lighten-1"
						>
						<div class="cropper-content">
							<section class="cropper-area">
								<div class="img-cropper">
									<vue-cropper
										:minContainerWidth="720"
										:minContainerHeight="350"
										ref="cropper"
										:aspect-ratio="4 / 4"
										:src="imgSrc"
										preview=".preview"
									/>
								</div>
								<div class="actions">
									<div class="row">
										<div class="col-12">
											<DxButtonGroup
												:items="buttons"
												:selected-item-keys="['left']"
												key-expr="button"
												styling-mode="outlined"
												@item-click="selectImageButton"
												class="bg-white"
											/>
										</div>
									</div>
									<div class="row">
										<div class="col-12">
											 <DxButton
												:width="150"
												class="ml-4"
												text="Reset"
												type="danger"
												icon="material-icons format_color_reset"
												styling-mode="contained"
												:focusStateEnabled="false"
												@click="reset">
											</DxButton>
											<DxButton
												:width="150"
												class="ml-4"
												text="Crop"
												type="success"
												icon="material-icons crop"
												styling-mode="contained"
												:focusStateEnabled="false"
												@click="cropImage">
											</DxButton>
										</div>
									</div>
								</div>
							</section>
							<section class="preview-area">
								<p>Preview</p>
								<div class="preview" />
								<div class="cropped-image">
									<img
										v-if="cropImg"
										:src="cropImg"
										alt="Cropped Image"
									/>
									<div v-else class="crop-placeholder" />
								</div>
							</section>
						</div>
						</v-card>
						<div class="row justify-end">
							<div class="col-4 text-center">
								<v-btn 
									@click="step = 1"
									text>
									Back
								</v-btn>
								<v-btn
									:disabled="cropImg.length === 0"
									color="primary"
									@click="sendFile">
									Submit
								</v-btn>
							</div>
						</div>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>

		</v-sheet>
	</v-bottom-sheet>

	
</template>

<script>
import { mapState } from "vuex";

import DxButtonGroup from 'devextreme-vue/button-group';
import DxButton from 'devextreme-vue/button';

export default {
	name: "profileImageComponent",
	mixins: [],
	components: {
		DxButtonGroup,
		DxButton
	},
	props: {
		openImageSheet: {
			type: Boolean,
			required: true
		},
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
			//Main Data 
			step: 1,
			progress: 0,
			file: "",
			fileURL: "",
			files: [],
			error: false,
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


			//CroppieJS
			imgSrc: 'https://dummyimage.com/720x350/242424/fff',
      cropImg: '',
			data: null,
			//Button Data
			buttons: [
				{
					icon: 'material-icons open_with',
					shortCode: 'open_with',
					hint: 'Pan'
				},
				{
					icon: 'material-icons zoom_in',
					shortCode: 'zoom-in',
					hint: 'Zoom In'
				},
				{
					icon: 'material-icons zoom_out',
					shortCode: 'zoom-out',
					hint: 'Zoom Out'
				},
				{
					icon: 'material-icons arrow_back',
					shortCode: 'move-left',
					hint: 'Move Left'
				},
				{
					icon: 'material-icons arrow_forward',
					shortCode: 'move-right',
					hint: 'Move Right'
				},
				{
					icon: 'material-icons arrow_upward',
					shortCode: 'move-up',
					hint: 'Move Up'
				},
				{
					icon: 'material-icons arrow_downward',
					shortCode: 'move-down',
					hint: 'Move Down'
				},
				{
					icon: 'mdi mdi-replay',
					shortCode: 'rotate-left',
					hint: 'Rotate Left'
				},
				{
					icon: 'mdi mdi-replay mdi-flip-h',
					shortCode: 'rotate-right',
					hint: 'Rotate Right'
				},
				{
					icon: 'mdi mdi-flip-horizontal',
					shortCode: 'flip-horiz',
					hint: 'Flip Horizontally'
				},
				
				{
					icon: 'mdi mdi-flip-vertical',
					shortCode: 'flip-vert',
					hint: 'Flip Vertically'
				},
			]
			//Form Data



		};
	},
	methods: {
		testingMethod(e) {
			console.log("this.file", this.file);
		},
		closeSheet(e) {
			console.log("Close Sheet")
			this.$emit('closeSheet', false)
		},
		resetFields() {
			this.file = "";
			this.cropped = "";
			this.fileURL = "";
			this.activeStep = 0;
		},
		selectImageButton(e) {
			console.log("selectImageButton, e", e)
			if(e.itemData === "zoom-in") {
				this.zoom(0.2)
			}
			if(e.itemData === "zoom-out") {
				this.zoom(-0.2)
			}
			if(e.itemData === "move-left") {
				this.move(-10, 0)
			}
			if(e.itemData === "move-right") {
				this.move(10, 0)
			}
			if(e.itemData === "move-up") {
				this.move(0, -10)
			}
			if(e.itemData === "move-down") {
				this.move(0, 10)
			}

			if(e.itemData === "rotate-left") {
				this.rotate(-90)
			}
			if(e.itemData === "rotate-right") {
				this.rotate(90)
			}

			if(e.itemData === "flip-horiz") {
				this.flipX
			}
			if(e.itemData === "flip-vert") {
				this.flipY
			}
			

		},
		selectFile(e) {
			//Get image URL and send to bind method
			console.log("Event", e);
			
			let newImageFile = e.target.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(newImageFile);
			reader.onload = (e) => {
				this.fileURL = e.target.result;
				// rebuild cropperjs with the updated source
				this.$refs.cropper.replace(e.target.result);
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
					this.$store.commit(this.profileImageSettings.mutation, response.data);
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

		//CroppieJS Settings
		cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    showFileChooser() {
      this.$refs.invFile.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },


	},
	computed: {
		...mapState(["Static"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss" scoped>
.profile-image-cards {
	background: rgb(223, 223, 223);
	height: calc(90vh - 265px);
}

.close-image-button {
	text-align: right;
	position: relative;
	right: 0px;
	top: -18px;
}

.progress-bar {
	height: 10px;
	color:blue;
	width:100%;
}

//Start Cropper Settings
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}

.cropper-content {
  display: flex;
	justify-content: space-evenly;
	.cropper-area {
		background: rgb(165, 165, 165);
		width: 720px;
		.img-cropper {
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgb(195, 195, 195);
			width: 720px;
			height: 350px;
		}
	}
}

.actions {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062CC;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  width: 307px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image {
	display: flex;
	padding: 20px;
	justify-content: center;
	background: #ccc;
	img {
	width: 200px;
	height: 200px;
  max-width: 100%;
}
	
}
//End Cropper Settings
</style>
