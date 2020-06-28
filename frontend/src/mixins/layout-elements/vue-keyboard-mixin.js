export const vueKeyboardMixin = {
  data() {
    return {
   

    }
  },
  methods: {
		//Vue-Keyboard-Methods
		accept(text) {
			alert("Input text: " + text);
			this.hide();
		},
		show(e) {
			console.log("e", e);
			console.log("this.$refs", this.$refs);
			this.input = e.target;
			this.layout = e.target.dataset.layout;

			if (!this.visible) this.visible = true;
			console.log("this.visible", this.visible);
		},
		hide() {
			this.visible = false;
		},
  

  },
  mounted() {

  },
  created() {
    console.log("The created Mixin for the LocaleMixin worked!");
  }
}