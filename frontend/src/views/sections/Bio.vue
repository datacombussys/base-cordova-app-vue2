<template>
  <base-section
    id="bio"
  >

    <base-section-heading 
		title="CORE TEAM"
		space="1">
    </base-section-heading>

    <v-container>
      <v-row
				v-for="user in staff"
				:key="staff.id"
        align="center"
        justify="center"
				class="mb-4"
      >
        <v-col
				class="my-8"
          cols="12"
          md="10"
        >
				<base-user-card
					v-bind="user">
				</base-user-card>


        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionBio',

    data: () => ({
			staff: [
				{
					name: "Ian Christensen",
					bio: `<p>Ian Christensen is an entrepreneur who at an early age had a determination to learn how businesses operated. In order to get a jump start, while he was in college, he started a salsa manufacturing company and started selling to bars and restaurants in the Phoenix area. Ian had developed his first website for this salsa manufacturing and sales company.</p>
								<p>After graduating Arizona State University with a business degree, Ian realized his sales skills were an invaluable skill to help grow all types of businesses. Ian started with a telecommunications company as an Account Executive and quickly became promoted to Sales Manager. </p>
								<p>As the needs of Ian’s customers grew, Ian was able to develop websites for their existing businesses by utilizing technologies such as WordPress and Dot Net Nuke (DNN). At this point, Ian was familiar with standard frontend languages like CSS and HTML. </p>
								<p>The next step was to move back into business ownership, so Ian launched Datacom Merchant Services (DMS). DMS is a business-to-business sales organization offering credit card processing solutions.  </p>
								<p>Ian’s vision for his customers was to offer a complete Point of Sale solution including: inventory management, credit card processing, cash drawers, barcode scanners, thermal printers, etc. </p>
								<p>Ian contracted an overseas company to complete the project. One year and thousands of dollars later, the contractors were unable to develop the functionality required for the project.</p>
								<p>After evaluating “lessons learned” from this setback, Ian took the bull by the horns and learned to program himself. Equipped with the knowledge, Ian was able to properly manage and approve work being done by contractors and contribute to the development of the project. </p>
								<p>The education journey began and Datacom Business Systems, LLC was born.</p>
								<p>Within the first six months of inception, Ian was able to develop all of the features that the overseas company was not able to complete. Ian has over 25 years of website creation and development experience. He has dedicated the last three years to intense learning, specific to the intricacies of programming languages and coding complexities.</p>
								<p>Currently, Ian is proficient in Python, JavaScript, HTML and CSS. As a result of the extensive “frontend” technology know-how, Ian is responsible for the look and design of all projects under management.</p>

					`,
					years: 25,
					image: 'Ian-Headshot.jpg',
					position: "Chief Executive Officer"
				},
				{
					name: "Willam Mantly",
					bio: `<p>When William Mantly decided become a programmer at the age of 13, it was an undertaking involving a group of aspiring friends in the suburbs of New York City. They supported each other in their learning and helped each other through their desire and passion for technology. It was because of this programming club that Mr. Mantly has turned into a programming prodigy he is today, garnering respect and accolades in the industry.</p>
								<p>William is A+ Cisco certified in networking and training. Over the years William’s core languages have grown to include the following languages: PHP, C, Lua, Bash, JavaScript, and Python. William’s expertise centers around backend systems and computer languages. This means that William has extensive knowledge and experience deploying and maintaining network servers, desktops, routers, and networking hardware. William has a love for Linux based systems and spends the majority of his workday at the command line.</p>
								<p>William’s free time consists of sharing his knowledge and love for technology with others. He is actively involved in the community by providing training services and education to aspiring students so that they may avoid the pitfalls that Mr. Manley learned the hard way.</p>
								<p>Over the years William has worked as a software engineer for various companies and we are honored to have him part of our organization today.</p>
					`,
					years: 21,
					image: 'WilliamMantly.jpg',
					position: "Chief Technical Officer"
				}
			]
    }),
  }
</script>
