export const StoreModuleMixins = {
  data() {
    return {
    }
  },
  methods: {
    test() {
      console.log('specialData', specialData);
    },
    returnStoreModule(module) {
			const state = this.$store._modules.root.state;
			if(module = "Attendance") {
				return state.Attendance;
			}
    }
   
  },
  mounted() {

  },
  created() {
    console.log("The DataTableMixins loaded!");
  }
}