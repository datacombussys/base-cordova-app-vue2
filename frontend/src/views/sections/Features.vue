<template>
  <base-section
    id="features"
    class="background"
  >
		<base-section-heading title="TECHNOLOGIES">
    </base-section-heading>
    <v-responsive
      class="mx-auto"
      max-width="1600"
    >
      <v-container 
				class="mx-auto"
				fluid>
				
        <v-row>
          <v-col
						class="mx-auto"
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="4"
            md="3"
          >
            <base-info-card
              align="center"
              v-bind="card"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionFeatures',

    data: () => ({
      cards: [
        {
          icon: 'mdi-keyboard-outline',
          title: 'Web Application',
          text: 'Websites and web applications are an absolute requirement in today’s marketplace. Web applications allow you to store your data in the cloud and access it anywhere from any device.',
        },
        {
          icon: 'mdi-camera-outline',
          title: 'Desktop',
          text: 'Using Electron© technology, we are able to deploy beautiful and reliable desktop applications in a snap. Existing projects include Point of Sale software and stock trading/charting software.',
        },
        {
          icon: 'fa-android',
          title: 'Android',
          text: 'Using Phone-gap© technology, Datacom is able to develop hybrid Android© applications that are readily available to download from the Google Play Store©.',
				},
				{
          icon: 'mdi-pencil-outline',
          title: 'Apple IOS',
          text: 'Using Phone-gap© technology, Datacom is able to develop hybrid Apple© IOS applications that are readily available to download from the iTunes© store.',
        },
      ],
    }),
  }
</script>
