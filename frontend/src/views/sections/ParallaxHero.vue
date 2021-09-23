<template>
  <section id="parallax-hero">
     <base-parallax
		 	:height="500"
			 src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">

			<!-- <template>
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
			</template> -->
			
		</base-parallax> 
  </section>
</template>

<script>
  export default {
    name: 'SectionHero',

    provide: {
      theme: { isDark: true },
		},	
		data() {
			return {
				stats: [
					['24k', 'Github Stars'],
					['330+', 'Releases'],
					['1m', 'Downloads/mo'],
					['5m', 'Total Downloads'],
				],
			}
		},

    computed: {
      minHeight () {
        const height = this.$vuetify.breakpoint.mdAndUp ? '100vh' : '50vh'

        return `calc(${height} - ${this.$vuetify.application.top}px)`
      },
    },
  }
</script>
