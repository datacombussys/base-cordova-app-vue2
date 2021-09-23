<template>
  <base-section
    id="technology-partners"
    class="grey lighten-4"
    space="36"
  >
		<base-section-heading title="Technology Partners" />

		<v-slide-group>
			<template v-for="n in 13">
				<v-slide-item
					center-active
					show-arrows
					:key="n"
					class="align-self-center"
				>
					<base-img
						:src="require(`@/assets/static/website/logo-${n}.png`)"
						color="grey"
						contain
						height="40"
						width="128"
					/>
				</v-slide-item>

				<v-responsive
					v-if="n < 6"
					:key="`divider-${n}`"
					class="text-center"
					height="56"
					width="48"
				>
					<v-divider vertical />
				</v-responsive>
			</template>
		</v-slide-group>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionTechnologyPartners',
  }
</script>
