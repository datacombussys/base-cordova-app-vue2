<template>
  <v-theme-provider :dark="dark">
		<div
				align="end"
				class="row fill-height"
			>
			<div
				class="col-4 pt-5"
				align-content="center">

				<v-card
					class="mx-auto p-5 text-center"
					width="225px"
					tile
				>
				<v-row>
					<v-badge
						color="green"
						:content="years + ' Years'"
						offset-y="20"
						class="z-10"
					>
					</v-badge>
				</v-row>
					
					<v-row
						align="center"
						class="fill-height"
					>
						<v-col
							align-self="start"
							class="pa-0 items-center"
							cols="12"
						>
							<v-avatar
								class="profile"
								color="grey"
								size="164"

							>
								<v-img :src="require('@/assets/static/website/' + image + '')">
								</v-img>
							</v-avatar>
							<v-row class="mt-1">
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title class="title">
											{{ name }}
										</v-list-item-title>
										<v-list-item-subtitle>
											{{ position }}

										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-row>

	
						</v-col>
					</v-row>
				</v-card>
			</div>
				<div
					class="col-8 py-0 text-left">
					<p><span v-html="bio"></span></p>
					
				</div>
		</div>

  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseUserCard',

    props: {
      dark: Boolean,
			dense: Boolean,
			name: String,
			bio: String,
			years: Number,
			image: String,
			position: String,
    },

    data: () => ({

    }),
  }
</script>

<style lang="scss" scoped>
.customcol {
	min-height: 100%;
}
</style>