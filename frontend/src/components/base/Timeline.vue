<template>

    <v-stepper-step
			:complete="step > 1"
			step="1"
		>
				{{ step.title }}
		</v-stepper-step>


</template>

<script>
  // Mixins
  import Heading from '@/mixins/components/heading'

  export default {
    name: 'BaseTimeline',

    mixins: [Heading],

    props: {
      dark: Boolean,
      callout: String,
      color: {
        type: String,
        default: 'primary',
      },
      icon: String,
      subtitle: String,
      text: String,
      title: String,
		},
		data: () => ({
			step: 1,

			
		})
  }
</script>
