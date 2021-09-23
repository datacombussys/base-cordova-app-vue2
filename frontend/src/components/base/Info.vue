<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-img
        :src="require('@/assets/static/logos/Databoxx-BoxLogo-500x500.png')"
        contain
        max-width="200"
        min-height="150"
        width="100%"
      />

      <base-title
        size="body-1"
        space="4"
        title="AMERICAN MADE SOFTWARE"
        weight="regular"
      />

      <base-body>
        Although there are some situations where programmers are outsources from different countries, all software is ultimately managed, and developed in the United States. 
      </base-body>

      <base-btn
        class="mb-12"
        color="white"
        outlined
				href="mailto:support@datacombusinessystems.com"
      >
        Let's Talk
      </base-btn>
    </div>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseInfo',

    props: {
      title: String,
      dark: Boolean,
    },

    data: () => ({
    }),
  }
</script>
