<template>
  <base-info-card title="ADVANTAGES">
    <a
      v-for="feature in features"
      :key="feature"
      :text="feature"
      class="mb-6 grey--text body-1 d-block text-none"
      v-html="`&rsaquo; ${feature}`"
    />
  </base-info-card>
</template>

<script>
  export default {
    name: 'SectionFeaturesAlt',

    data: () => ({
      features: [
        'Friendly People',
        'COVID Safe',
        'Local Resources',
        'Support Services',
				'Software as a Service',
				'Server Management',
				'Mission Critical Success',
      ],
    }),
  }
</script>
