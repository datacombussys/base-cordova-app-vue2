<template>
  <base-section id="theme-features">
    <base-section-heading title="What you can expect with us">
      We are a 100% customer focused organization. Your success is our success. When hiring Datacom Busness Systems, you can consider us as a part of your team.
    </base-section-heading>

    <v-container class="mx-auto px-12">
      <v-row>
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          cols="12"
          md="6"
        >
          <base-avatar-card
            v-bind="feature"
            align="left"
            horizontal
          >
            text here
						
					</base-avatar-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionThemeFeatures',

    data: () => ({
      features: [
				{
					color: 'primary',
					dark: true,
					title: 'Planning and Design',
					icon: 'fa-award',
					text: 'Every client can expect award winning service. Our team is ready to help you achieve your goals and we\'re willing to do whatever it takes to complete your mission.'
				},
				{
					color: 'primary',
					dark: true,
					title: 'Technical Know-how',
					icon: 'fa-brain',
					text: 'Datacom has full-stack experience developing frontend and backend applications that seamlessly talk to each other and exchange data.'
				},
				{
					color: 'primary',
					dark: true,
					title: 'Service Level Agreement',
					icon: 'fa-handshake',
					text: 'We are believers in meeting and exceeding a Service Level Agreement. Our SLA covers issues that pertain to response times, minimum resources, delivery expectations, and more.'
				},
				{
					color: 'primary',
					dark: true,
					title: 'Consulting Services',
					icon: 'fa-people-arrows',
					text: 'We are not a consulting firm, so we don\'t charge for consulting services. When you hire us, our knowledge and expertise is incuded because that\'s just the way it should be.'
				},
				{
					color: 'primary',
					dark: true,
					title: 'Ownership of Responsibility',
					icon: 'fa-file-alt',
					text: 'Our philosophy is to own every piece of the project from start to end. This means no finger pointing. If something goes wrong, we take responsibility to make it right.'
				},
				{
					color: 'primary',
					dark: true,
					title: 'Customer First Mindset',
					icon: 'fa-users',
					text: 'Everything we do is centered around placing the customer’s needs first. In this industry everything is customizable, even the customer experience.'
				},
			],
    }),
  }
</script>
