<template>
  <base-section id="about-our-process">
    <base-section-heading
			space="2"
      color="grey lighten-2"
      icon="mdi-link-variant"
      title="About our Process"
    />

    <v-container class="mx-auto">
			<base-body
			class="text-center">
				Methodology: Agile or Waterfall?
				<div>
					The answer is... We use a hybrid approach to Agile and Waterfall.
				</div>
				
			</base-body>
      <v-row>
        <v-col
          v-for="card in cards"
          :key="card.title"
          cols="12"
          md="4"
        >
          <base-info-card v-bind="card" />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionAboutOurProcess',

    data: () => ({
      cards: [
				{
          title: 'Waterfall Development Process',
          subtitle: 'Sequential \ Linear Development',
          text: 'The waterfall methodology limits change during development. Utilizing the waterfall method, there are 6 steps to complete sequentially. Once the stage has commenced, it is to be completed as planned. Changes on-the-fly are difficult to implement using this method.',
          callout: '01',
        },
        {
          title: 'Agile Development Process',
          subtitle: 'Frequent Feedback Looping',
          text: 'The agile methodology embraces change during development and implements a continual refactoring process at each step that includes customer feedback. The feedback is used to change the course of direction as necessary. The result is a highly customized solution with a expectation of a flexible timeframe.',
          callout: '02',
        },
        {
          title: 'Datacom Development Process',
          subtitle: 'Best of Both Worlds',
          text: 'Waterfall and agile have pros and cons. Therefore, in order to develop a solution that meets deadlines and allows for change, we utilize components ofrom both methodologies. Datacom embraces change during the process and makes provision for tight deadlines by allocating additional resources at an hourly rate.',
          callout: '03',
        },
      ],
    }),
  }
</script>
