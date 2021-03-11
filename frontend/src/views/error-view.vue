<template>
  <div>
		<div>
			<h1>Error</h1>
			<p>You have reached this page in error</p>
			<p>You are only allowed to access your own dashboard. Please check your url and try again</p>
			<p>If you continue to have difficulty, please contact support at:</p>
			<p>Datacom Business Systems</p>
			<p>1866-555-1212</p>
		</div>

			
  </div>
</template>

<script>
import { mapState } from "vuex"



export default {

  data() {
    return {

			

		}
	},
	methods: {
		testButton() {
			console.log("Auth.webdomain", this.Auth.webdomain)

		},

		
	},
	computed: {
		...mapState(["Auth"])
		
		
	}

};
</script>

<style lang="scss">


</style>
