<template>
	<div>
    <div class="empty" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop">
			<div class="fill" draggable @dragstart="dragStart" @drag="Drag" @dragend="dragEnd"></div>
		</div>
		<div class="empty" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop" ></div>
		<div class="empty" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop" ></div>
		<div class="empty" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop" ></div>
		<div class="empty" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="dragDrop" ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
	name: "dragnDropComponent",
	mixins: [],
	components: {},
	props: {
		// moduleInfo: {
		// 	type: Object,
		// 	required: true
		// }
	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log("this.shippingForm");
		},
		dragStart(a) {
			console.log('dragStart');
			console.log('a', a);

		},
		Drag(b) {
			console.log('Dragging');
				
		},
		dragEnd(c) {
			console.log('dragEnd');
			console.log('c', c);

		},
		dragOver(e) {
			console.log('dragOver');
			e.preventDefault();
			
		},
		dragEnter(e) {
			console.log('dragEnter');
			e.preventDefault();
			e.target.classList.add('hovered');
		},
		dragLeave(e) {
			console.log('dragLeave');
			e.target.classList.remove('hovered');
		},
		dragDrop(e) {
			console.log('e', e);
			console.log('dragDrop');
			e.target.classList.remove('hovered');
			console.log('e', e);
			const element = document.querySelector('.fill');
			e.target.append(element);
			
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

<style scoped style="less">
.fill {
	background-image: url('http://source.unsplash.com/random/150x150');
	position: relative;
	height: 150px;
	width: 150px;
	top: 5px;
	left: 5px;
	cursor: pointer
}
.empty {
	display: inline-block;
	height: 170px;
	width: 170px;
	margin: 10px;
	border: 3px salmon solid;
	background: white;
}

.hovered {
	background: lightgrey;
	border-style: dashed;
}

.invisible {
	display: none;
}

</style>
