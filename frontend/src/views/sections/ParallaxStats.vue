<template>
  <v-theme-provider dark>
    <base-section
      id="parallax"
      class="secondary"
      space="36"
    >
      <v-row
        align="center"
        class="ma-0"
        justify="center"
      >


        <v-responsive
          max-width="100%"
          width="100%"
        >
         <base-parallax
					:src="require('@/assets/static/teamwork-gradient-1930x1300.jpg')">
				 

				 	<template>
						<v-container fill-width fill-height>
							<v-row class="mx-auto">
								<v-col
									v-for="[value, title] of stats"
									:key="title"
									cols="12"
									md="3"
								>
									<div class="text-center">
										<div
											class="display-3 font-weight-black mb-4"
											v-text="value"
										></div>

										<div
											class="title font-weight-regular text-uppercase"
											v-text="title"
										></div>
									</div>
								</v-col>
							</v-row>
						</v-container>
					</template>

				 </base-parallax> 
        </v-responsive>
      </v-row>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
		name: 'SectionParallaxStats',
		data() {
			return {
				stats: [
					['1M+', 'Lines of Code'],
					['50+', 'Completed Projects'],
					['40', 'Years of Experience'],
					['100\'s', 'happy Customers'],
				],
			}
		},
	}
	
</script>
