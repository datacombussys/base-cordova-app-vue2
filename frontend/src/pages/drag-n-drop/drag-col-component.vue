<template>
	<div 
		:id="id"
		class="empty-col" 
		draggable
		@dragstart="dragStart"
		@dragenter="dragEnter" 
		@dragover.stop="dragOver" 
		@dragleave="dragLeave" 
		@drop.prevent="dragDrop">
		<slot />
	</div>
</template>

<script>
import { mapState } from "vuex";


export default {
	name: "dragColComponent",
	mixins: [],
	components: {},
	props: {
		id: {
			type: String
		},

		Drag: {
			type: Function
		},
		dragOver: {
			type: Function
		},
		dragEnter: {
			type: Function
		},
		dragLeave: {
			type: Function
		},
		dragDrop: {
			type: Function
		}
	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm");
		},
		dragStart(e) {
			console.log('dragStart e', e);
			const target = e.target;

			if(target.id.includes('col')) {
				e.dataTransfer.setData('col_id', target.id);
			} else {
				e.dataTransfer.setData('col_id', 'col_' + target.id);
			}

			// setTimeout(() => {
			// 	target.style.display = 'none';
			// });
		}
		
	},
	computed: {
		// ...mapState(["Invoices"])
	},
	created() {},
	mounted() {

	}
};
</script>

<style lang="less">
.empty-col {
	display: inline-block;
	flex-direction: row;
	min-width: 170px;
	margin-left: 10px;
	border: 3px rgb(146, 20, 6) solid;
	background: rgb(0, 218, 218);
	padding: 20px;
	cursor: pointer;
}
</style>
