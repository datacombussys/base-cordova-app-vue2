<template>
	<div>

		<div class="headline">
			Website Details
		</div>
		<!-- Website Sales Info -->
		<v-tabs
			fixed-tabs
			dark
			color="#F86A31"
		>
			<v-tab>
				Description
			</v-tab>
			<v-tab>
				Specifications
			</v-tab>
			<v-tab>
				Files
			</v-tab>
			<v-tab-item>
				<DxHtmlEditor height="550px">
					<DxMediaResizing :enabled="true"/>
					<DxToolbar :multiline="isMultiline">
						<DxItem format-name="undo"/>
						<DxItem format-name="redo"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="sizeValues"
							format-name="size"
						/>
						<DxItem
							:format-values="fontValues"
							format-name="font"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="bold"/>
						<DxItem format-name="italic"/>
						<DxItem format-name="strike"/>
						<DxItem format-name="underline"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="alignLeft"/>
						<DxItem format-name="alignCenter"/>
						<DxItem format-name="alignRight"/>
						<DxItem format-name="alignJustify"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="orderedList"/>
						<DxItem format-name="bulletList"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="headerValues"
							format-name="header"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="color"/>
						<DxItem format-name="background"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="link"/>
						<DxItem format-name="image"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="clear"/>
						<DxItem format-name="codeBlock"/>
						<DxItem format-name="blockquote"/>
					</DxToolbar>

					<div v-html="markup"/>
				</DxHtmlEditor>
			</v-tab-item>
			<v-tab-item>
				<DxHtmlEditor height="550px">
					<DxMediaResizing :enabled="true"/>
					<DxToolbar :multiline="isMultiline">
						<DxItem format-name="undo"/>
						<DxItem format-name="redo"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="sizeValues"
							format-name="size"
						/>
						<DxItem
							:format-values="fontValues"
							format-name="font"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="bold"/>
						<DxItem format-name="italic"/>
						<DxItem format-name="strike"/>
						<DxItem format-name="underline"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="alignLeft"/>
						<DxItem format-name="alignCenter"/>
						<DxItem format-name="alignRight"/>
						<DxItem format-name="alignJustify"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="orderedList"/>
						<DxItem format-name="bulletList"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="headerValues"
							format-name="header"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="color"/>
						<DxItem format-name="background"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="link"/>
						<DxItem format-name="image"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="clear"/>
						<DxItem format-name="codeBlock"/>
						<DxItem format-name="blockquote"/>
					</DxToolbar>

					<div v-html="markup"/>
				</DxHtmlEditor>
			</v-tab-item>
			<v-tab-item>
				<form
					id="form"
					ref="inventoryFilesRef"
					method="post"
					action=""
					enctype="multipart/form-data"
				>
					<div class="fileuploader-container">
						<DxFileUploader
							select-button-text="Select file(s)"
							label-text=""
							accept="image/*"
							upload-mode="useForm"
							:multiple="true"
						/>
					</div>
					<DxButton
						text="Upload"
						type="success"
						@click="onButtonClick"
					/>
				</form>
				
			</v-tab-item>
		</v-tabs>

		<!-- Internal Sales Info -->
		<div class="headline mt-10">
			Internal Notes
		</div>
		<v-tabs
			fixed-tabs
			dark
			color="#F86A31"
		>
			<v-tab>
				Vendor Notes
			</v-tab>
			<v-tab>
				Sales Notes
			</v-tab>
			<v-tab-item>
				<DxHtmlEditor height="550px">
					<DxMediaResizing :enabled="true"/>
					<DxToolbar :multiline="isMultiline">
						<DxItem format-name="undo"/>
						<DxItem format-name="redo"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="sizeValues"
							format-name="size"
						/>
						<DxItem
							:format-values="fontValues"
							format-name="font"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="bold"/>
						<DxItem format-name="italic"/>
						<DxItem format-name="strike"/>
						<DxItem format-name="underline"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="alignLeft"/>
						<DxItem format-name="alignCenter"/>
						<DxItem format-name="alignRight"/>
						<DxItem format-name="alignJustify"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="orderedList"/>
						<DxItem format-name="bulletList"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="headerValues"
							format-name="header"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="color"/>
						<DxItem format-name="background"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="link"/>
						<DxItem format-name="image"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="clear"/>
						<DxItem format-name="codeBlock"/>
						<DxItem format-name="blockquote"/>
					</DxToolbar>

					<div v-html="markup"/>
				</DxHtmlEditor>
			</v-tab-item>
			<v-tab-item>
				<DxHtmlEditor height="550px">
					<DxMediaResizing :enabled="true"/>
					<DxToolbar :multiline="isMultiline">
						<DxItem format-name="undo"/>
						<DxItem format-name="redo"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="sizeValues"
							format-name="size"
						/>
						<DxItem
							:format-values="fontValues"
							format-name="font"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="bold"/>
						<DxItem format-name="italic"/>
						<DxItem format-name="strike"/>
						<DxItem format-name="underline"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="alignLeft"/>
						<DxItem format-name="alignCenter"/>
						<DxItem format-name="alignRight"/>
						<DxItem format-name="alignJustify"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="orderedList"/>
						<DxItem format-name="bulletList"/>
						<DxItem format-name="separator"/>
						<DxItem
							:format-values="headerValues"
							format-name="header"
						/>
						<DxItem format-name="separator"/>
						<DxItem format-name="color"/>
						<DxItem format-name="background"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="link"/>
						<DxItem format-name="image"/>
						<DxItem format-name="separator"/>
						<DxItem format-name="clear"/>
						<DxItem format-name="codeBlock"/>
						<DxItem format-name="blockquote"/>
					</DxToolbar>

					<div v-html="markup"/>
				</DxHtmlEditor>
			</v-tab-item>
		</v-tabs>
	</div>
</template>

<script>
import { mapState } from "vuex";
import {
  DxHtmlEditor,
  DxToolbar,
  DxMediaResizing,
  DxItem
} from 'devextreme-vue/html-editor';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import DxButton from "devextreme-vue/button"

export default {
	name: "inventorySalesComponent",
	mixins: [],
	components: {
		DxButton,
		DxHtmlEditor,
    DxMediaResizing,
    DxToolbar,
		DxItem,
		DxFileUploader
	},
	props: {

	},
	data() {
		return {
			markup: "<div>Please enter data here</div><p>V-bind here</p>",
			sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5],
      isMultiline: true

		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		onButtonClick() {
			console.log('onButtonClick')
		}
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
