<script>
import { mapState } from "vuex";


export default {
	name: "dragRowFunctional",
	mixins: [],
	components: {},
	props: {

	},
	render(h) {
		return h('h1', 'jhffu')
		
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
			console.log('dragStart');
			console.log('e', e);

		},
		Drag() {
			console.log('Dragging');
		},
		dragEnd(e) {
			console.log('dragEnd');

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

<style scoped lang="less">
.row-container {
	padding-bottom: 100px;
	border: 3px grey solid;
}
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
	width: 100%;
	margin-top: 10px;
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