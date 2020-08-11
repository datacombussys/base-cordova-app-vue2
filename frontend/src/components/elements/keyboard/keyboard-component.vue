<template>
	<div>
		<DxButton
			v-if="hideKeyboard"
			:width="200"
			text="Show Keyboard"
			type="default"
			styling-mode="outlined"
			@click="hideKeyboard = !hideKeyboard"
		/>
		<DxButton
			v-if="!hideKeyboard"
			:width="200"
			text="Hide Keyboard"
			type="default"
			styling-mode="outlined"
			@click="hideKeyboard = !hideKeyboard"
		/>
		<div :class="{hidden: hideKeyboard}"> 
			<div :class="keyboardClass"></div>
		</div>
		
	</div>
</template>

<script>
import { mapState } from "vuex";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

import DxButton from 'devextreme-vue/button';

export default {
	name: "keyboardComponent",
	mixins: [],
	components: {
		DxButton
	},
	props: {
		keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    }
	},
	data() {
		return {
			keyboard: null,
			hideKeyboard: false
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		 onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
	},
	watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  },
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {
		this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    });
	}
};
</script>

<style scoped lang="scss">

</style>
