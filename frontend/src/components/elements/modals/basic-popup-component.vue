<template>
	<div class="container py-0">
		<v-overlay
			:absolute="false"
			:value="openedBasicPopup">
			<v-sheet
				light
				color="v-primary-base"
				class="mx-auto"
				height="575"
				width="600">
				<nav class="close-button-row">
					<div class="header">
						<slot name="title"></slot>
					</div>
					<div class="close-button">
						<v-btn fab @click="closePopup">
						<v-icon style="font-size: 45px">mdi-close-circle</v-icon>
					</v-btn>
					</div>
				</nav>
				<div class="container">
					<div class="row">
						<div 	
							class="p-4 w-full fixed-height"
							width="100%">
							<DxScrollView
								show-scrollbar="always"
								:height="400"
								width="100%">
								<slot name="main-data"></slot>
								
								
							</DxScrollView>
						</div>
					</div>
					
					
					<div class="row border-t-4 border-datacom-darker">
						<slot name="action"></slot>
					</div>
				</div>

				

			</v-sheet>
		</v-overlay>	
	</div>
</template>


<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//DevExpress
import { DxScrollView } from 'devextreme-vue/scroll-view';
import DxButton from "devextreme-vue/button"

export default {
	name: "basicPopupComponent",
	mixins: [],
	components: {
		DxScrollView,
		DxButton
	},
	props: {
		openedBasicPopup: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			//Main Data
		
		}
	},
	methods: {
		testingMethod(e) {
			console.log('e', e);
		},
		saveMethod() {
			console.log("saveMethod")
			this.$emit("callSaveMethod")
		},
		closePopup(evt) {
			this.$emit("closePopup", false)
		}

	},
	computed: {
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">
.close-button-row {
	top: 50px;
	
}
.close-button {
	top: -20px;
	right: -20px;
}
.fixed-height {
	height: 410px;
}

</style>
