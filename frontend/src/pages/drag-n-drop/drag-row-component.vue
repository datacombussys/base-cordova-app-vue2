<template>
	<div 
		:id="id" 
		class="empty" 
		draggable
		@dragstart="dragStart"
		@dragenter="dragEnter" 
		@dragover.prevent="dragOver" 
		@dragleave="dragLeave"
		@drop.prevent="dragDrop">
		<slot />
	</div>
</template>

<script>
import { mapState } from "vuex";



export default {
	name: "dragRowComponent",
	mixins: [],
	components: {

	},
	props: {
		id: {
			type: String
		},
		Drag: {
			type: Function
		},
		dragEnter: {
			type: Function
		},
		dragOver: {
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
		return {
		
		}
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm");
		},
		dragStart(e) {
			console.log('dragStart e', e);

			const target = e.target;
			if(target.id.includes('row')) {
				e.dataTransfer.setData('from_row_id', target.id);
			} else {
				e.dataTransfer.setData('from_row_id', 'row_' + target.id);
			}

			// setTimeout(() => {
			// 	target.style.display = 'none';
			// }, 0);
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

<style lang="scss">
.empty {
	display: block;
	min-height: 170px;
	width: 100%;
	margin-top: 10px;
	border: 3px salmon solid;
	background: rgb(235, 235, 235);
	padding-bottom: 50px;
	cursor: pointer;
}
.hovered {
	background: rgb(149, 149, 149);
	border: 3px salmon dashed;
}

</style>
