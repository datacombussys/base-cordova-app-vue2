<template>
	<div>
		<v-bottom-sheet class="top-sheet" v-model="groupSheetOpened">
      <v-sheet height="100vh">
				<nav class="close-sheet-button">
					<div class="header">
						Groups
					</div>
					<div class="close-button">
						<a href="#" @click="groupSheetOpened = false">
							<fa-layer class="mdi-35">
								<fa-icon :icon="['fas', 'circle']" style="color:#F75403;"></fa-icon>
								<fa-icon :icon="['fas', 'times']" style="color:white;" data-fa-transform="shrink-6"></fa-icon>
							</fa-layer>
						</a>
					</div>
				</nav>
				<div class="frame-container-sheet">
					<DxScrollView
						id="groupScroll"
						ref="groupScrollWidget"
						height="100%"
						width="100%"
						:scroll-by-content="false"
						:scroll-by-thumb="true"
						show-scrollbar="always"
						:bounce-enabled="true">
						<div class="content-block">
							

						</div>
					</DxScrollView>
						<v-divider></v-divider>
						<v-divider></v-divider>
						<v-divider></v-divider>
					<div class="row justify-end">
						
						<div class="col-2 mr-3 text-right">
							<v-btn @click="groupSheetOpened = false">
								Close
							</v-btn>
						</div>
					</div>
				</div>
      </v-sheet>
    </v-bottom-sheet>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

//Devexorcess
import { DxScrollView } from 'devextreme-vue/scroll-view';

//Components


export default {
	name: "groupsSheetComponent",
	mixins: [],
	components: {
		DxScrollView,

	},
	props: {

	},
	data() {
		return {
			groupSheetOpened: false,
		};
	},
	methods: {
		testingMethod(e) {

		},

	},
	computed: {
		...mapState([]),
		...mapGetters([]),
	},
	created() {},
	mounted() {}
}
</script>

<style scoped lang="scss">
.top-sheet {
	z-index: 2000;
}
.close-sheet-button {
	text-align: right;
	position: relative;
	right: -1px;
	top: -18px;
}

.frame-container-sheet {
	height: calc(90vh - 150px);
}
</style>
