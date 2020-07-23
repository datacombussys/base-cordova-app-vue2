<template>
	<div>
		<p>Form Wizard</p>
		<form-wizard :title="formWizard.title" :subtitle="formWizard.subtitle">
			<tab-content title="Personal details" icon="mdi mdi-check-bold">
				My first tab content
			</tab-content>
			<tab-content title="Additional Info" icon="mdi mdi-check-bold">
					My second tab content
			</tab-content>
			<tab-content title="Last step" icon="mdi mdi-check-bold">
				Yuhuuu! This seems pretty simple
			</tab-content>
		</form-wizard>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "employeeHumanResourcesComponent",
	mixins: [],
	components: {
		
	},
	props: {
		accountSettings: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			formWizard: {
				title: "My Wizard",
				subtitle: "Subtitle"
			}
		};
	},
	methods: {
		testingMethod(e) {
			console.log();
		}
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
