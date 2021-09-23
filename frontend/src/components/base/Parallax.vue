<template>
	<div>
		<v-parallax 
			v-bind="$attrs"
      v-on="$listeners"
			>

			<slot />
			
		</v-parallax>
	</div>
</template>

<script>

  export default {
    name: 'BaseParallax',
    props: {
      space: {
        type: [Number, String],
        default: 96,
      },
		},
		data() {
			return {
				//Main Data

			}
		},
		methods: {
			testButton() {
				console.log('this.imgWidth')

			},
	
		},
    computed: {


		},
		watch: {

		},
		mounted() {

			
		},
	}

</script>

<style lang="scss">

</style>
