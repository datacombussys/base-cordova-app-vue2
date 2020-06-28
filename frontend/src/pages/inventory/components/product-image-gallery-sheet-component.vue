<template>
	<div>
		<!-- Product Image Gallery Content -->
		<f7-sheet
			class="gallery-images image-sheet"
			:opened="galleryUploadSettings.gallerySheetOpened"
			@sheet:closed="galleryUploadSettings.gallerySheetOpened = false"
		>
			<f7-toolbar>
				<div class="left"></div>
				<div class="right">
					<f7-link sheet-close>Close</f7-link>
				</div>
			</f7-toolbar>
			<!-- Scrollable sheet content -->
			<f7-page-content>
				<div class="left" v-if="uploadMessage" :class="`message ${error ? 'is-danger' : 'is-success'}`">
					<div class="message-body">{{ uploadMessage }}</div>
				</div>
				<f7-block>
					<form enctype="multipart/form-data">
						<f7-row class="justify-content-center">
							<div class="dropzone">
								<input
									type="file"
									name="invArray"
									multiple
									@change="selectFiles"
									ref="galleryfiles"
									class="input-field"
								/>
								<p v-if="!uploading" class="call-to-action">
									Drop files here
								</p>
							</div>
						</f7-row>
						<f7-row>
							<f7-col>
								<f7-block>
									<div class="field">
										<f7-row calss="full-width" v-if="files.length != 0">
											<f7-col width="20">
												<p>Name</p>
											</f7-col>
											<f7-col width="20">
												<p class="text-align-center">Title</p>
											</f7-col>
											<f7-col width="30">
												<p class="text-align-center">Subtitle</p>
											</f7-col>
											<f7-col width="20">
												<p class="text-align-center">Progress</p>
											</f7-col>
											<f7-col width="10" class="level-right">
												<p>Delete</p>
											</f7-col>
										</f7-row>
										<div
											:class="`level ${file.invalidMessage && 'has-text-danger'}`"
											v-for="(file, index) in files"
											:key="index"
										>
											<f7-row class="full-width">
												<f7-col width="20">
													<div class="level-left">
														{{ file.name }}
														<span v-if="file.invalidMessage">&nbsp; - {{ file.invalidMessage }}</span>
													</div>
												</f7-col>
												<f7-col width="20">
													<f7-input
														:value="file.title"
														@input="file.title = $event.target.value"
														type="text"
													></f7-input>
												</f7-col>
												<f7-col width="30">
													<f7-input
														:value="file.sub_title"
														@input="file.sub_title = $event.target.value"
														type="text"
													></f7-input>
												</f7-col>
												<f7-col width="20">
													<p v-if="uploading" class="progress-bar is-primary" :value="progress" max="100">
														<progress class="progress"></progress>
														{{ progress }} %
													</p>
												</f7-col>
												<f7-col width="10">
													<div class="level-right">
														<a
															@click.prevent="
																files.splice(index, 1);
																uploadFiles.splice(index, 1);
															"
															class="delete"
														>
														</a>
													</div>
												</f7-col>
											</f7-row>
										</div>
									</div>
								</f7-block>
							</f7-col>
						</f7-row>
						<f7-row class="margin">
							<f7-col width="50">
								<f7-button fill @click.prevent="sendFiles">Submit</f7-button>
							</f7-col>
							<f7-col width="50">
								<f7-button fill @click.prevent="testingMethod">Test</f7-button>
							</f7-col>
						</f7-row>
					</form>
				</f7-block>
			</f7-page-content>
			<!-- END Product Image Gallery Content -->
		</f7-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components


export default {
	name: "imageGalleryUploadSheetComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
		galleryUploadSettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			//Component Data

			//Main Data
			//Image Uploading
			fileURL: null,
			file: "",
			files: [],
			uploadFiles: [],
			uploadedFiles: [],
			progress: 0,
			uploading: false,
			uploadMessage: "",
			invCategory: {
				id: null,
				name: null
			},



		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},
		selectFiles() {
			const files = this.$refs.galleryfiles.files;
			this.uploadFiles = [...this.files, ...files];
			this.files = [
				...this.files,
				..._.map(files, (key) => ({
					name: key.name,
					size: key.size,
					type: key.type,
					title: key.title,
					invalidMessage: this.validateFiles(key)
				}))
			];
			console.log("this.files2", this.files);
			console.log("this.uploadFiles", this.uploadFiles);
		},
		sendFiles() {
			if (this.uploadFiles.length != 0) {
				console.log("this.uploadFiles.length", this.uploadFiles);
				var lastUploadFile = this.uploadFiles.pop();
				console.log("lastUploadFile.pop", lastUploadFile);
				var lastFile = this.files.pop();
				console.log("lastFile.pop", lastFile);

				const formData = new FormData();
				if (this.validateFiles(lastUploadFile) === undefined) {
					formData.set("image", lastUploadFile);
					console.log("file[key]", lastUploadFile);
					console.log("lastFile", lastFile);
					formData.set("product", this.invForm.id);
					formData.set("title", lastFile.title);
					formData.append("sub_title", lastFile.sub_title);
					formData.append("size", lastFile.size);
					//Just logging the formData Only
					for (let pair of formData.entries()) {
						console.log("formData Pairs", pair[0] + "," + pair[1]);
					}
					try {
						this.uploading = true;
						axios({
							method: "put",
							data: formData,
							headers: {
								"Content-Type": "application/json;charset=UTF-8",
								"Access-Control-Allow-Origin": "*",
								Authorization: "Token " + token
							},
							url: "/django/inventorygallery/" + formdata.id + "/",
							onUploadProgress: function(e) {
								this.progress = Math.round((e.loaded * 100) / e.total);
							}
						}).then((response) => {
							console.log("response", response);
							this.$store.commit("APPEND_GALLERY_LIST", response.data);
							this.uploadedFiles.push(response.data.file);
							response.type = "Update Inventory Gallery Images";
							this.$store.dispatch("updateNotification", response);
						});
						this.uploading = false;
						this.message = "File has been uploaded";
						formData.delete("file");
					} catch {
						this.uploadMessage = err.response.data.error;
						this.error = true;
						this.uploading = false;
					}
				}
				console.log("formData2", formData);
				this.sendFiles();
			} else {
				console.log("Else Statement of Images, No more left");
				console.log("Else, this.invForm", this.invForm);
				this.getInventoryImages();
			}
		},
		deleteInvGalleryImg(id) {
			this.$store.dispatch("DELETEInventoryImage", {id: id});
		},
		validateFiles(file) {
			const MAX_SIZE = 5400000000;
			const allowedFileTypes = ["image/jpeg", "image/png", "image/x-png", "image/gif"];
			if (file.size > MAX_SIZE) {
				return `Max Size: ${MAX_SIZE / 1000}kb`;
			}
			if (!allowedFileTypes.includes(file.type)) {
				return "Not an Image";
			}
		},


	},
	computed: {
		...mapState(["Auth", "Attendance"]),
		...mapGetters([])

	},
	created() {

	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="less">
.gallery-images {
	height: 100vh;
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
.input-field {
	opacity: 0;
	width: 100%;
	height: 200px;
	position: absolute;
	cursor: pointer;
}
</style>
