<template>
  <base-section 
		id="theme-features">
    <base-section-heading title="Project Timeline">
    </base-section-heading>


		<v-row>
			<v-col
				class="mx-auto"
				cols="11"
			>
				<v-stepper alt-labels dark
				class="text-center">
					<v-stepper-header 
						width="100%"
						>
						<v-stepper-step
							editable
							class="text-center"
							v-for="step in steps"
							:key="step.id"
							:step="step.id"
						>
						{{ step.title }}
								
						</v-stepper-step>
						
	
						
					</v-stepper-header>
				</v-stepper>
			</v-col>
		</v-row>

  </base-section>

	
 
</template>

<script>
  export default {
		name: 'SectionTimeline',

		data: () => ({
			steps: [
				{
					id: 1,
					icon: 'mdi-keyboard-outline',
					title: 'Business Requirements',
					text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
				},
				{
					id: 2,
					icon: 'mdi-camera-outline',
					title: 'Architecture and UX/UI Design',
					text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
				},
				{
					id: 3,
					icon: 'mdi-pencil-outline',
					title: 'Development with Feedback',
					text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
				},
				{
					id: 4,
					icon: 'mdi-lifebuoy',
					title: 'Testing and Deployment',
					text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
				},
				{
					id: 5,
					icon: 'mdi-lifebuoy',
					title: 'Maintenance and Support',
					text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
				},
			],
		}),
	}
</script>
