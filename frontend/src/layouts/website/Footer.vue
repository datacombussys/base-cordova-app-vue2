<template>
  <v-footer
    id="home-footer"
    color="grey darken-4"
    dark
    min-height="72"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex flex-wrap justify-md-start justify-center justify-md-none">
            <template v-for="(s, i) in social">
              <a
                :key="i"
                class="white--text pa-1 pa-md-0"
                :href="s.path"
                v-text="s.name"
              />

              <v-responsive
                v-if="i < social.length - 1"
                :key="`divider-${s.name}`"
                class="mx-4 shrink hidden-sm-and-down"
                max-height="24"
              >
                <v-divider vertical />
              </v-responsive>
            </template>
          </div>
        </v-col>

        <v-col
          class="text-center text-md-right"
          cols="12"
          md="6"
        >
          Copyright &copy; 2021 Datacom Business Systems LLC
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'HomeFooter',

    data: () => ({
			social: [
				{
					name:'Facebook', path: "https://www.facebook.com/Datacom-Business-Systems-311149419576874"
				},
				{
					name:'Twitter', path: "https://twitter.com/datacombussys"
				},
				{
					name:'Linkedin', path: "https://www.linkedin.com/company-beta/16194364/"
				},
      ],
    }),
  }
</script>

<style lang="sass">
  #home-footer a
    text-decoration: none
</style>
